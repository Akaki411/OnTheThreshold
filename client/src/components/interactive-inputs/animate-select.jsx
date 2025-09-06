import { useState, useRef, useEffect } from 'react';

const AnimateSelect = ({
    options = [],
    onSelect = () => {},
    placeholder = "Выберите опцию",
    selectedId = null
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (selectedId)
        {
            const option = options.find(opt => opt.id === selectedId)
            setSelectedOption(option || null)
        }
        else
        {
            setSelectedOption(null)
        }
    }, [selectedId, options])

    useEffect(() => {
        const handleClickOutside = (event) =>
        {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target))
            {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (option) => {
        setSelectedOption(option)
        setIsOpen(false)
        onSelect(option.id)
    }

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div onClick={handleToggle} className="dropdown-field">
                <span className="dropdown-text">
                    {selectedOption ? selectedOption.title : placeholder}
                </span>
                <svg className={`dropdown-arrow ${isOpen ? 'open' : ''}`} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {options.length === 0 ? (
                        <div className="dropdown-empty">
                            Нет доступных опций
                        </div>
                    ) : (
                        options.map((option) => (
                            <div key={option.id} onClick={() => handleSelect(option)} className={`dropdown-item ${selectedOption?.id === option.id ? 'selected' : ''}`}>
                                {option.title}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default AnimateSelect