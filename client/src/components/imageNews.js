import React from 'react';

class ImageNews extends React.Component
{
    constructor(props)
    {
        super(props)
        this.block = React.createRef()
        this.state = {
            offset: 10,
            limit: 10
        }
        window.addEventListener("resize", () => {
            let x = Math.floor(this.block.current.clientWidth / 50)
            let y = Math.min(Math.floor((this.block.current.clientHeight * 0.9 - 40) / 18) - 1, 3)
            this.setState({limit: x * y})
        })
    }

    componentDidMount() {
        let x = Math.floor(this.block.current.clientWidth / 50)
        let y = Math.min(Math.floor((this.block.current.clientHeight * 0.9 - 40) / 18) - 1, 3)
        this.setState({limit: x * y})
    }

    SliceText(text, limit)
    {
        const words = text.split(" ")
        let result = words.slice(0, Math.min(limit, words.length)).join(" ")
        if (words.length > limit) result += "..."
        return result
    }

    render()
    {
        return (
            <div className="image-new" style={{backgroundImage: `url(${this.props.data.img})`}} ref={this.block}>
                <a href={"/news/" + this.props.data.id}>
                    <div className="image-new-gradient">
                        <div className="image-new-content">
                            <div className="image-new-content_box">
                                <h1 style={{fontSize: this.props.titleSize || "auto"}}>{this.props.data.title}</h1>
                                <div className="image-new-content_description">
                                    {this.SliceText(this.props.data.content, this.state.limit)}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default ImageNews;