const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

class DDoSProtection
{
    constructor(options = {})
    {
        this.options = {
            windowMs: options.windowMs || 15 * 60 * 1000,
            maxRequests: options.maxRequests || 100,
            slowWindowMs: options.slowWindowMs || 15 * 60 * 1000,
            slowDelayAfter: options.slowDelayAfter || 50,
            slowDelayMs: options.slowDelayMs || 500,
            slowMaxDelayMs: options.slowMaxDelayMs || 10000,
            aggressiveWindowMs: options.aggressiveWindowMs || 5 * 60 * 1000,
            aggressiveMaxRequests: options.aggressiveMaxRequests || 10,
            aggressiveBanTime: options.aggressiveBanTime || 30 * 60 * 1000,

            whitelist: options.whitelist || [],

            messages: {
                rateLimitExceeded: options.rateLimitMessage || 'Слишком много запросов, попробуйте позже',
                banned: options.bannedMessage || 'IP адрес временно заблокирован'
            },
            enableLogging: options.enableLogging !== false,
            ...options
        }
        this.bannedIPs = new Map()
        this.suspiciousIPs = new Map()
        this.setupCleanupTimer()
    }

    setupCleanupTimer()
    {
        setInterval(() =>
        {
            const now = Date.now()

            for (const [ip, banTime] of this.bannedIPs.entries()) {
                if (now - banTime > this.options.aggressiveBanTime) {
                    this.bannedIPs.delete(ip);
                }
            }
            for (const [ip, data] of this.suspiciousIPs.entries())
            {
                if (now - data.lastSeen > this.options.aggressiveWindowMs)
                {
                    this.suspiciousIPs.delete(ip)
                }
            }
        }, 60000)
    }

    isWhitelisted(ip)
    {
        return this.options.whitelist.includes(ip) ||
            this.options.whitelist.includes('127.0.0.1') && (ip === '127.0.0.1' || ip === '::1');
    }

    getRealIP(req)
    {
        return req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
            req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
            req.headers['x-real-ip']
    }

    log(message, level = 'info')
    {
        if (this.options.enableLogging)
        {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [DDoS Protection] [${level.toUpperCase()}] ${message}`)
        }
    }

    createRateLimiter()
    {
        return rateLimit({
            windowMs: this.options.windowMs,
            max: this.options.maxRequests,
            message: {
                error: this.options.messages.rateLimitExceeded,
                retryAfter: Math.ceil(this.options.windowMs / 1000)
            },
            standardHeaders: true,
            legacyHeaders: false,
            skip: (req) => this.isWhitelisted(this.getRealIP(req)),
            handler: (req, res) => {
                const ip = this.getRealIP(req)
                this.log(`Rate limit exceeded for IP: ${ip}`, 'warn')
                this.trackSuspiciousActivity(ip)
                res.status(429).json({
                    error: this.options.messages.rateLimitExceeded,
                    retryAfter: Math.ceil(this.options.windowMs / 1000)
                })
            }
        })
    }

    createSlowDown()
    {
        return slowDown({
            windowMs: this.options.slowWindowMs,
            delayAfter: this.options.slowDelayAfter,
            delayMs: () => this.options.slowDelayMs,
            maxDelayMs: this.options.slowMaxDelayMs,
            skip: (req) => this.isWhitelisted(this.getRealIP(req)),
            validate: {
                delayMs: false
            }
        })
    }

    trackSuspiciousActivity(ip)
    {
        if (this.isWhitelisted(ip)) return

        const now = Date.now()
        const existing = this.suspiciousIPs.get(ip)

        if (existing)
        {
            existing.count++
            existing.lastSeen = now
            if (existing.count >= this.options.aggressiveMaxRequests)
            {
                this.bannedIPs.set(ip, now)
                this.suspiciousIPs.delete(ip)
                this.log(`IP ${ip} banned for aggressive behavior`, 'error')
            }
        }
        else
        {
            this.suspiciousIPs.set(ip, {
                count: 1,
                firstSeen: now,
                lastSeen: now
            })
        }
    }

    checkBannedIP()
    {
        return (req, res, next) => {
            const ip = this.getRealIP(req)

            if (this.isWhitelisted(ip))
            {
                return next()
            }
            const banTime = this.bannedIPs.get(ip)
            if (banTime)
            {
                const timeLeft = Math.ceil((this.options.aggressiveBanTime - (Date.now() - banTime)) / 1000)

                if (timeLeft > 0)
                {
                    this.log(`Blocked request from banned IP: ${ip}`, 'warn')
                    return res.status(403).json({
                        error: this.options.messages.banned,
                        retryAfter: timeLeft
                    })
                }
                else
                {
                    this.bannedIPs.delete(ip);
                }
            }
            next()
        }
    }

    analyzeRequestPatterns()
    {
        return (req, res, next) => {
            const ip = this.getRealIP(req)

            if (this.isWhitelisted(ip))
            {
                return next()
            }
            const userAgent = req.get('User-Agent') || ''
            const suspiciousAgents = [
                'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
                'python', 'java', 'php', 'go-http-client'
            ]

            const isSuspiciousAgent = suspiciousAgents.some(agent => userAgent.toLowerCase().includes(agent))
            const hasStandardHeaders = req.get('Accept') && req.get('Accept-Language')
            const now = Date.now()
            const lastRequest = req.session?.lastRequest || 0
            const timeBetweenRequests = now - lastRequest
            if (req.session)
            {
                req.session.lastRequest = now
            }

            if ((isSuspiciousAgent && !hasStandardHeaders) || timeBetweenRequests < 100)
            {
                this.trackSuspiciousActivity(ip);
                this.log(`Suspicious request pattern detected from IP: ${ip}`, 'warn')
            }
            next()
        }
    }

    getStats()
    {
        return {
            bannedIPs: Array.from(this.bannedIPs.entries()).map(([ip, banTime]) => ({
                ip,
                bannedAt: new Date(banTime).toISOString(),
                timeLeft: Math.max(0, Math.ceil((this.options.aggressiveBanTime - (Date.now() - banTime)) / 1000))
            })),
            suspiciousIPs: Array.from(this.suspiciousIPs.entries()).map(([ip, data]) => ({
                ip,
                ...data,
                firstSeen: new Date(data.firstSeen).toISOString(),
                lastSeen: new Date(data.lastSeen).toISOString()
            })),
            totalBanned: this.bannedIPs.size,
            totalSuspicious: this.suspiciousIPs.size
        }
    }

    unbanIP(ip)
    {
        const wasBlocked = this.bannedIPs.delete(ip)
        this.suspiciousIPs.delete(ip)
        this.log(`IP ${ip} manually unbanned`, 'info')
        return wasBlocked
    }

    banIP(ip, reason = 'Manual ban')
    {
        this.bannedIPs.set(ip, Date.now())
        this.suspiciousIPs.delete(ip)
        this.log(`IP ${ip} manually banned: ${reason}`, 'warn')
    }

    middleware()
    {
        const rateLimiter = this.createRateLimiter()
        const slowDown = this.createSlowDown()
        const bannedChecker = this.checkBannedIP()
        const patternAnalyzer = this.analyzeRequestPatterns()
        return [bannedChecker, rateLimiter, slowDown, patternAnalyzer]
    }
}

module.exports = DDoSProtection