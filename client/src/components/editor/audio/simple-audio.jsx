import axios from "axios";
import "./audio.css"
export default class SimpleImage
{
    constructor(props)
    {
        this.data = props.data
        this.config = props.config
        this.link = ""
        this.title = ""
        this.caption = ""
        this.config.title = this.config.title || true
        this.config.caption = this.config.caption || true
    }

    static get toolbox()
    {
        return {
            title: "Audio player",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 75 75"><g style="fill:#000000;stroke:#000000;stroke-width:5;stroke-linejoin:round;stroke-linecap:round"><path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"/><path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;"/></g></svg>'
        }
    }

    async uploadAudio(file)
    {
        const formData = new FormData()
        formData.append('file', file)
        if(!this.config.endpoint)
        {
            throw "The endpoint is not specified. Specify the endpoint address in the configuration."
        }
        const data = await axios.post(this.config.endpoint, formData)
        return data.data.url
    }

    audioSelector()
    {
        const block = document.createElement("div")
        const audio = document.createElement("audio")
        const selector = document.createElement("label")
        const input = document.createElement("input")
        const upload = document.createElement("input")
        const icon = document.createElement("div")
        const audioPlace = document.createElement("div")
        const uploadButton = document.createElement("label")

        block.classList.add("audio-upload-selector")

        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 75 75" xml:space="preserve"><path style="fill:#AAAFB2;stroke:none;" d="M37.5,2C57.1,2,73,17.9,73,37.5S57.1,73,37.5,73S2,57.1,2,37.5S17.9,2,37.5,2 M37.5,0 C16.8,0,0,16.8,0,37.5C0,58.2,16.8,75,37.5,75S75,58.2,75,37.5C75,16.8,58.2,0,37.5,0L37.5,0z"/><line style="fill:none;stroke:#AAAFB2;stroke-width:2;stroke-miterlimit:10;" x1="23" y1="37" x2="53" y2="37"/><line style="fill:none;stroke:#AAAFB2;stroke-width:2;stroke-miterlimit:10;" x1="38" y1="52" x2="38" y2="22"/></svg>'
        input.type = "file"
        input.accept="audio/mp3"
        input.classList.add("hide")
        selector.classList.add("audio-upload-selector_select")
        selector.appendChild(input)
        selector.appendChild(icon)

        audio.controls = true
        upload.type = "file"
        upload.accept="audio/mp3"
        uploadButton.classList.add("hide")
        uploadButton.classList.add("audio-upload-selector_audio_reload")
        uploadButton.appendChild(upload)
        uploadButton.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" xml:space="preserve"><path fill="#AAAFB2" d="M116.1,50.8V184c0,6.6,5.4,12,11.9,12c6.6,0,12-5.4,12-12V50.8l23,23c4.7,4.6,12.2,4.6,16.9,0c2.2-2.3,3.5-5.2,3.5-8.4c0-3.2-1.2-6.2-3.5-8.5l-43.4-43.4c-1.1-1.1-2.4-2-4-2.7c-1.4-0.6-3-0.9-4.5-0.9c-1.5,0-3.1,0.3-4.6,0.9c-1.5,0.6-2.8,1.5-3.9,2.6L76.1,56.9c-2.3,2.3-3.5,5.2-3.5,8.5c0,3.2,1.3,6.2,3.5,8.5c4.6,4.6,12.2,4.6,16.9,0L116.1,50.8z"/><path fill="#AAAFB2" d="M211.1,206.2c0,8.8-7.2,15.9-15.9,15.9H60.8c-8.8,0-15.9-7.2-15.9-15.9v-35.4H21v35.4c0,22,17.9,39.8,39.8,39.8h134.4c22,0,39.8-17.9,39.8-39.8v-35.4h-23.9V206.2L211.1,206.2z"/></svg>`
        audioPlace.classList.add("audio-upload-selector_audio")
        audioPlace.appendChild(audio)
        audioPlace.appendChild(uploadButton)

        upload.addEventListener("change", async (event) => {
            if(event.target.value === "") return
            let link = await this.uploadAudio(event.target.files[0])
            this.link = link
            if(!this.config.static)
            {
                console.warn("The address of the static server has not been added. To play the preview, you must specify the address in the config")
            }

            audio.src = this.config.static + link
            audio.load()
        })


        input.addEventListener("change", async (event) => {
            if(event.target.value === "") return
            let link = await this.uploadAudio(event.target.files[0])
            this.link = link
            if(!this.config.static)
            {
                console.warn("The address of the static server has not been added. To play the preview, you must specify the address in the config")
            }
            audio.src = this.config.static + link
            audio.load()
            block.removeChild(selector)
            block.appendChild(audioPlace)
        })
        block.appendChild(selector)

        return block
    }

    render()
    {
        const wrapper = document.createElement("div")
        const name = document.createElement("input")
        const caption = document.createElement("textarea")
        const info = document.createElement("div")
        const upload = document.createElement("div")
        const selector = this.audioSelector()

        wrapper.classList.add("audio-upload-place")

        name.type = "text"
        name.name = "title"
        name.placeholder = "Введите название трека"

        caption.name = "caption"
        caption.placeholder = "Введите описание трека"

        name.addEventListener("input", (event) => {
            this.title = event.target.value
        })
        caption.addEventListener("input", (event) => {
            this.caption = event.target.value
        })

        info.appendChild(name)
        info.appendChild(caption)
        info.classList.add("audio-upload-info")

        upload.appendChild(selector)
        wrapper.appendChild(info)
        wrapper.appendChild(upload)

        return wrapper
    }

    save()
    {
        return {
            src: this.link,
            title: this.title,
            caption: this.caption
        }
    }

    validate({src, title, caption})
    {
        return (src !== "") && (!this.config.title || title !== "") && (!this.config.caption || caption !== "")
    }
}