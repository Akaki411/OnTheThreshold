import React, { useState, useEffect, useRef, cloneElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedSwipe = (
    {
        activeID = 0,
        className,
        style,
        children
    }) => {
    const [currentIndex, setCurrentIndex] = useState(activeID)
    const [direction, setDirection] = useState(0)
    const previousIndexRef = useRef(activeID)

    useEffect(() =>
    {
        if (activeID !== currentIndex)
        {
            const newDirection = activeID > previousIndexRef.current ? 1 : -1
            setDirection(newDirection)
            setCurrentIndex(activeID)
            previousIndexRef.current = activeID
        }
    }, [activeID, currentIndex])

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8
        })
    };

    const transition = {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
    }

    if (!children || children.length === 0) {
        return (
            <div className={className}>
                Нет компонентов для отображения
            </div>
        )
    }
    return (
        <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className={className}
                style={style}
            >{children[activeID]}</motion.div>
        </AnimatePresence>
    )
}

export default AnimatedSwipe