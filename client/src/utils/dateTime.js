const months = {
    1: "января",
    2: "февраля",
    3: "марта",
    4: "апреля",
    5: "мая",
    6: "июня",
    7: "июля",
    8: "августа",
    9: "сентября",
    10: "октября",
    11: "ноября",
    12: "декабря",
}
export const HowMuchPassed = (time) => {
    const date = new Date(time)
    const now = new Date()

    const getFullDate = () => {return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
    const minutesPassed = () => {return Math.floor((now - date) / 60000)}
    const minutesFormat = (count) => {
        if(count === 1) return "минуту"
        if([2, 3, 4].includes(count)) return "минуты"
        if(count <= 20) return "минут"
        return minutesFormat(count % 10)
    }
    const hoursPassed = () => {return Math.floor((now - date) / 3600000)}
    const hoursFormat = (count) => {
        if(count === 1) return "час"
        if([2, 3, 4].includes(count)) return "часа"
        if(count <= 20) return "часов"
        return hoursFormat(count % 10)
    }
    const daysPassed = () => {return Math.floor((now - date) / 86400000)}
    const daysFormat = (count) => {
        if(count === 1) return "день"
        if([2, 3, 4].includes(count)) return "дня"
        if(count <= 20) return "дней"
        return daysFormat(count % 10)
    }
    const weeksPassed = () => {return Math.floor((now - date) / 604800000)}
    const weeksFormat = (count) => {
        if(count === 1) return "неделю"
        if([2, 3, 4].includes(count)) return "недели"
        if(count <= 20) return "недель"
        return weeksFormat(count % 10)
    }
    const monthsPassed = () => {return Math.floor((now - date) / 2592000000)}
    const monthsFormat = (count) => {
        if(count === 1) return "месяц"
        if([2, 3, 4].includes(count)) return "месяца"
        if(count <= 20) return "месяцев"
        return monthsFormat(count % 10)
    }

    const days = daysPassed()
    if(days <= 0)
    {
        const hours = hoursPassed()
        if(hours <= 0) return `${minutesPassed()} ${minutesFormat(minutesPassed())} назад`
        else return `${hours} ${hoursFormat(hours)} назад`
    }
    if(days < 7) return `${days} ${daysFormat(days)} назад`
    if(days < 30) return `${weeksPassed()} ${weeksFormat(weeksPassed())} назад`
    if(days < 93) return `${monthsPassed()} ${monthsFormat(monthsPassed())} назад`
    return getFullDate()
}
