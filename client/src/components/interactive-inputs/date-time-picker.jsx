import React, { useState, useEffect, useRef } from 'react'

const DateTimePicker = ({
    disabled = false,
    onChange = () => {},
    date = false,
    time = false,
    defaultValue = new Date(),
    title = "Выберите дату и время"
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [displayValue, setDisplayValue] = useState(title)
    const containerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) =>
        {
            if (containerRef.current && !containerRef.current.contains(event.target))
            {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        updateDisplayValue(defaultValue, defaultValue)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const year = defaultValue.getFullYear()
        const month = String(defaultValue.getMonth() + 1).padStart(2, '0')
        const day = String(defaultValue.getDate()).padStart(2, '0')
        const hours = String(defaultValue.getHours()).padStart(2, '0')
        const minutes = String(defaultValue.getMinutes()).padStart(2, '0')

        const dateStr = `${year}-${month}-${day}`
        const timeStr = `${hours}:${minutes}`

        if (date) setSelectedDate(dateStr)
        if (time) setSelectedTime(timeStr)

        updateDisplayValue(date ? dateStr : '', time ? timeStr : '')
    }, [])

    const updateDisplayValue = (dateStr, timeStr) =>
    {
        let display = ''
        if (date && dateStr)
        {
            const dateObj = new Date(dateStr)
            display += dateObj.toLocaleDateString('ru-RU')
        }
        if (time && timeStr)
        {
            if (display) display += ' '
            display += timeStr
        }
        setDisplayValue(display)
    }

    const updateDateTime = (dateStr, timeStr) =>
    {
        let dateObj = new Date()
        if (date && dateStr)
        {
            const [year, month, day] = dateStr.split('-')
            dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        }

        if (time && timeStr)
        {
            const [hours, minutes] = timeStr.split(':')
            if (date && dateStr)
            {
                dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            }
            else
            {
                dateObj = new Date()
                dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0)
            }
        }
        onChange(dateObj)
    }

    const handleDateChange = (e) =>
    {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        updateDateTime(newDate, selectedTime);
        updateDisplayValue(newDate, selectedTime);
    }

    const handleTimeChange = (e) =>
    {
        const newTime = e.target.value
        setSelectedTime(newTime)
        updateDateTime(selectedDate, newTime)
        updateDisplayValue(selectedDate, newTime)
    }

    const handleMainClick = () =>
    {
        if (!disabled)
        {
            setIsOpen(!isOpen)
        }
    }

    if (disabled && disabled !== false)
    {
        return null
    }

    return (
        <div ref={containerRef} className="datetime-picker-container">
            <div className={`datetime-picker-main ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`} onClick={handleMainClick}>
                <span>{displayValue}</span>
                <svg className={`dropdown-arrow ${isOpen ? 'open' : ''}`} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <div className="datetime-picker-dropdown">
                    {date && (
                        <div className={`datetime-picker-field ${time ? 'with-margin' : ''}`}>
                            <label className="datetime-picker-label">
                                Дата:
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="datetime-picker-input"
                            />
                        </div>
                    )}
                    {time && (
                        <div className="datetime-picker-field">
                            <label className="datetime-picker-label">
                                Время:
                            </label>
                            <input
                                type="time"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                className="datetime-picker-input"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default DateTimePicker