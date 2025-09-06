import React, { useState, useRef } from 'react';

class ImageTool
{
    static get toolbox()
    {
        return {
            title: 'Image',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="m249 149c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20zm83 91v-224c0-7-5-12-12-12h-284c-7 0-12 5-12 12v224c0 7 5 12 12 12h284c7 0 12-5 12-12zm-52-108 57 95h-248l58-95c2-4 8-4 10 0l50 83 46-77c2-4 8-4 10 0z"/></svg>'
        }
    }

    constructor({ data, config, api, readOnly })
    {
        this.api = api;
        this.readOnly = readOnly;
        this.config = config || {}

        this.uploadUrl = this.config.uploadUrl

        this.data = {
            src: data.src || '',
            alt: data.alt || '',
            alignment: data.alignment || 'center',
            size: data.size || 'medium',
            ...data
        }

        this.wrapper = undefined;
        this.imagePreview = null;
    }

    createImageUploader()
    {
        const ImageUploader = () =>
        {
            const [imageData, setImageData] = useState(this.data)
            const [isUploading, setIsUploading] = useState(false)
            const [uploadError, setUploadError] = useState('')
            const fileInputRef = useRef(null)

            const handleFileSelect = async (event) =>
            {
                const file = event.target.files[0]
                if (!file) return

                setIsUploading(true)
                setUploadError('')

                try
                {
                    const formData = new FormData()
                    formData.append('image', file)
                    const response = await fetch(this.uploadUrl, {
                        method: 'POST',
                        body: formData,
                    })

                    const result = await response.json()

                    if (result.success === 1)
                    {
                        const newData = {
                            ...imageData,
                            src: result.file.src,
                            alt: file.name
                        }
                        setImageData(newData)
                        this.data = newData
                    }
                    else
                    {
                        setUploadError('Ошибка загрузки изображения')
                    }
                }
                catch (error)
                {
                    setUploadError('Ошибка загрузки изображения')
                }
                finally
                {
                    setIsUploading(false)
                }
            }

            const handleAlignmentChange = (alignment) => {
                const newData = { ...imageData, alignment }
                setImageData(newData)
                this.data = newData
            }

            const handleSizeChange = (size) => {
                const newData = { ...imageData, size }
                setImageData(newData)
                this.data = newData
            }

            const handleAltChange = (event) =>
            {
                const newData = { ...imageData, alt: event.target.value }
                setImageData(newData)
                this.data = newData
            }

            const triggerFileInput = () =>
            {
                fileInputRef.current?.click();
            }

            const getSizeClass = (size) =>
            {
                switch (size) {
                    case 'small': return 'width: 200px; max-width: 30%;'
                    case 'large': return 'width: 100%;'
                    default: return 'width: 400px; max-width: 70%;'
                }
            }

            const getAlignmentClass = (alignment) =>
            {
                switch (alignment) {
                    case 'left': return 'text-align: left;'
                    case 'right': return 'text-align: right;'
                    default: return 'text-align: center;'
                }
            };

            return React.createElement('div',
                {
                style: {
                    border: '1px dashed #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    margin: '10px 0',
                    backgroundColor: '#101010'
                }
            }, [
                !imageData.src && React.createElement('div', {
                    key: 'upload-area',
                    style: { textAlign: 'center' }
                }, [
                    React.createElement('input', {
                        key: 'file-input',
                        ref: fileInputRef,
                        type: 'file',
                        accept: 'image/*',
                        onChange: handleFileSelect,
                        style: { display: 'none' },
                        disabled: this.readOnly
                    }),
                    React.createElement('button', {
                        key: 'upload-btn',
                        onClick: triggerFileInput,
                        disabled: isUploading || this.readOnly,
                        style: {
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#AD0000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isUploading ? 'not-allowed' : 'pointer',
                            opacity: isUploading ? 0.6 : 1
                        }
                    }, isUploading ? 'Загрузка...' : 'Выбрать изображение'),
                    uploadError && React.createElement('div', {
                        key: 'error',
                        style: { color: 'red', marginTop: '10px' }
                    }, uploadError)
                ]),

                imageData.src && React.createElement('div', {
                    key: 'image-preview'
                }, [
                    !this.readOnly && React.createElement('div', {
                        key: 'controls',
                        style: {
                            marginBottom: '15px',
                            display: 'flex',
                            gap: '15px',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'alignment-group',
                            style: { display: 'flex', alignItems: 'center', gap: '5px' }
                        }, [
                            React.createElement('span', { key: 'align-label' }, 'Позиция:'),
                            ['left', 'center', 'right'].map(align =>
                                React.createElement('button', {
                                    key: align,
                                    onClick: () => handleAlignmentChange(align),
                                    style: {
                                        padding: '5px 10px',
                                        backgroundColor: imageData.alignment === align ? '#AD0000' : '#303030',
                                        color: "#AAAFB2",
                                        border: '1px solid #dee2e6',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }
                                }, align === 'left' ? 'Лево' : align === 'right' ? 'Право' : 'Центр')
                            )
                        ]),
                        React.createElement('div', {
                            key: 'size-group',
                            style: { display: 'flex', alignItems: 'center', gap: '5px' }
                        }, [
                            React.createElement('span', { key: 'size-label' }, 'Размер:'),
                            ['small', 'medium', 'large'].map(size =>
                                React.createElement('button', {
                                    key: size,
                                    onClick: () => handleSizeChange(size),
                                    style: {
                                        padding: '5px 10px',
                                        backgroundColor: imageData.size === size ? '#AD0000' : '#303030',
                                        color: "#AAAFB2",
                                        border: '1px solid #dee2e6',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }
                                }, size === 'small' ? 'Малый' : size === 'large' ? 'Большой' : 'Средний')
                            )
                        ])
                    ]),
                    !this.readOnly && React.createElement('input', {
                        key: 'alt-input',
                        type: 'text',
                        placeholder: 'Описание изображения (alt)',
                        value: imageData.alt,
                        onChange: handleAltChange,
                        style: {
                            width: '100%',
                            padding: '8px',
                            marginBottom: '15px',
                            border: '1px solid #dee2e6',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }
                    }),

                    React.createElement('div', {
                        key: 'image-container',
                        style: { ...{ padding: '10px 0' }, ...eval(`({${getAlignmentClass(imageData.alignment)}})`) }
                    }, [
                        React.createElement('img', {
                            key: 'image',
                            src: "/content/images/" + imageData.src,
                            alt: imageData.alt,
                            style: {
                                ...eval(`({${getSizeClass(imageData.size)}}`),
                                height: 'auto',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }
                        })
                    ]),

                    !this.readOnly && React.createElement('div', {
                        key: 'replace-btn-container',
                        style: { textAlign: 'center', marginTop: '10px' }
                    }, [
                        React.createElement('button', {
                            key: 'replace-btn',
                            onClick: triggerFileInput,
                            disabled: isUploading,
                            style: {
                                padding: '8px 16px',
                                fontSize: '14px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }
                        }, 'Заменить изображение')
                    ])
                ])
            ])
        }

        return ImageUploader
    }

    render()
    {
        this.wrapper = document.createElement('div')

        this.wrapper.innerHTML = `
              <div id="image-tool-${Date.now()}" style="
                border: none;
                border-radius: 8px;
                padding: 20px;
                margin: 10px 0;
                background-color: #101010;
              ">
                ${this.data.src ? this.renderImagePreview() : this.renderUploadButton()}
              </div>
            `

        this.setupEventListeners()
        return this.wrapper
    }

    renderUploadButton()
    {
        return `
      <div style="text-align: center;">
        <input type="file" accept="image/*" style="display: none;" class="image-file-input" ${this.readOnly ? 'disabled' : ''}>
        <button class="upload-button" style="
          padding: 12px 24px;
          font-size: 16px;
          background-color: #AD0000;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        " ${this.readOnly ? 'disabled' : ''}>Выбрать изображение</button>
        <div class="upload-error" style="color: red; margin-top: 10px; display: none;"></div>
        <div class="upload-loader" style="margin-top: 10px; display: none;">Загрузка...</div>
      </div>
    `;
    }

    renderImagePreview() {
        const alignmentStyle = this.getAlignmentStyle();
        const sizeStyle = this.getSizeStyle();

        return `
      ${!this.readOnly ? this.renderControls() : ''}
      ${!this.readOnly ? `<input type="text" class="alt-input" placeholder="Описание изображения (alt)" value="${this.data.alt}" style="
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        background-color: #303030;
        color: #AAAFB2;
      ">` : ''}
      <div style="padding: 10px 0; ${alignmentStyle}">
        <img src="${import.meta.env.VITE_APP_API_URL + "/content/images/" + this.data.src}" alt="${this.data.alt}" style="${sizeStyle} height: auto; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      </div>
      ${!this.readOnly ? `<div style="text-align: center; margin-top: 10px;">
        <input type="file" accept="image/*" style="display: none;" class="image-file-input">
        <button class="replace-button" style="
          padding: 8px 16px;
          font-size: 14px;
          background-color: #AD0000;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Заменить изображение</button>
      </div>` : ''}
    `;
    }

    renderControls() {
        return `
          <div style="margin-bottom: 15px; display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
            <div style="display: flex; align-items: center; gap: 5px;">
              <span>Позиция:</span>
              ${this.renderAlignmentButtons()}
            </div>
            <div style="display: flex; align-items: center; gap: 5px;">
              <span>Размер:</span>
              ${this.renderSizeButtons()}
            </div>
          </div>
        `
    }

    renderAlignmentButtons() {
        const alignments = [
            { value: 'left', label: 'Лево' },
            { value: 'center', label: 'Центр' },
            { value: 'right', label: 'Право' }
        ]

        return alignments.map(({ value, label }) => `
                <button class="alignment-btn" data-alignment="${value}" style="
                padding: 5px 10px;
                background-color: ${this.data.alignment === value ? '#AD0000' : '#303030'};
                color: #AAAFB2;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                ">${label}</button>
            `).join('')
    }

    renderSizeButtons()
    {
        const sizes = [
            { value: 'small', label: 'Малый' },
            { value: 'medium', label: 'Средний' },
            { value: 'large', label: 'Большой' }
        ]

        return sizes.map(({ value, label }) => `
                <button class="size-btn" data-size="${value}" style="
                padding: 5px 10px;
                background-color: ${this.data.size === value ? '#AD0000' : '#303030'};
                color: #AAAFB2;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                ">${label}</button>
            `).join('')
    }

    setupEventListeners()
    {
        if (this.readOnly) return;

        const fileInput = this.wrapper.querySelector('.image-file-input')
        const uploadButton = this.wrapper.querySelector('.upload-button')
        const replaceButton = this.wrapper.querySelector('.replace-button')
        const altInput = this.wrapper.querySelector('.alt-input')
        const alignmentBtns = this.wrapper.querySelectorAll('.alignment-btn')
        const sizeBtns = this.wrapper.querySelectorAll('.size-btn')

        if (fileInput)
        {
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e))
        }

        if (uploadButton)
        {
            uploadButton.addEventListener('click', () => fileInput?.click())
        }

        if (replaceButton)
        {
            replaceButton.addEventListener('click', () => fileInput?.click())
        }

        if (altInput)
        {
            altInput.addEventListener('input', (e) => {
                this.data.alt = e.target.value
            })
        }

        alignmentBtns.forEach(btn =>
        {
            btn.addEventListener('click', (e) => {
                this.data.alignment = e.target.dataset.alignment
                this.updatePreview()
            })
        })

        sizeBtns.forEach(btn =>
        {
            btn.addEventListener('click', (e) =>
            {
                this.data.size = e.target.dataset.size
                this.updatePreview()
            })
        })
    }

    async handleFileUpload(event)
    {
        const file = event.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/'))
        {
            this.showError('Пожалуйста, выберите изображение')
            return
        }
        this.showLoader()
        try
        {
            const formData = new FormData()
            formData.append('image', file)

            const response = await fetch(this.uploadUrl, {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()
            if (result.success === 1)
            {
                this.data.src = result.file.url
                this.data.alt = file.name
                this.updatePreview()
            }
            else
            {
                this.showError('Ошибка загрузки изображения')
            }
        }
        catch (error)
        {
            this.showError('Ошибка загрузки изображения')
        }
        finally
        {
            this.hideLoader()
        }
    }

    showLoader()
    {
        const loader = this.wrapper.querySelector('.upload-loader')
        const button = this.wrapper.querySelector('.upload-button')
        if (loader) loader.style.display = 'block'
        if (button) button.disabled = true
    }

    hideLoader()
    {
        const loader = this.wrapper.querySelector('.upload-loader')
        const button = this.wrapper.querySelector('.upload-button')
        if (loader) loader.style.display = 'none'
        if (button) button.disabled = false
    }

    showError(message)
    {
        const errorEl = this.wrapper.querySelector('.upload-error')
        if (errorEl)
        {
            errorEl.textContent = message
            errorEl.style.display = 'block'
        }
    }

    updatePreview()
    {
        const container = this.wrapper.querySelector('[id^="image-tool-"]')
        if (container)
        {
            container.innerHTML = this.renderImagePreview()
            this.setupEventListeners()
        }
    }

    getAlignmentStyle()
    {
        switch (this.data.alignment)
        {
            case 'left': return 'text-align: left;'
            case 'right': return 'text-align: right;'
            default: return 'text-align: center;'
        }
    }

    getSizeStyle()
    {
        switch (this.data.size)
        {
            case 'small': return 'width: 200px; max-width: 30%;'
            case 'large': return 'width: 100%;'
            default: return 'width: 400px; max-width: 70%;'
        }
    }

    save()
    {
        return this.data
    }

    static get sanitize()
    {
        return {
            src: {},
            alt: {},
            alignment: {},
            size: {}
        }
    }
}

export default ImageTool