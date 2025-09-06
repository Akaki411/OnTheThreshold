import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../../main.jsx";

class ImageNews extends React.Component {
    constructor(props) {
        super(props);
        this.block = React.createRef();
        this.state = {
            offset: 10,
            limit: 10
        };

        this.handleResize = () => {
            if (this.block.current) {
                let x = Math.floor(this.block.current.clientWidth / 50);
                let y = Math.min(Math.floor((this.block.current.clientHeight * 0.9 - 40) / 18) - 1, 3);
                this.setState({limit: x * y});
            }
        }
    }

    componentDidMount()
    {
        window.addEventListener("resize", this.handleResize)
        this.handleResize();
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", this.handleResize);
    }

    SliceText(text, limit)
    {
        if (!text || isNaN(limit)) return "";
        const words = text.split(" ");
        let result = words.slice(0, Math.min(limit, words.length)).join(" ");
        if (words.length > limit) result += "...";
        return result;
    }

    render()
    {
        const { data, titleSize } = this.props;
        const backgroundImage = data?.img
            ? `url(${import.meta.env.VITE_APP_API_URL}/content/images/${data.img})`
            : 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'

        return (
            <div
                className="image-new"
                style={{backgroundImage}}
                ref={this.block}
            >
                <a href={`/article/${data?.id || '#'}`}>
                    <div className="image-new-gradient">
                        <div className="image-new-content">
                            <div className="image-new-content_box">
                                <h1 style={{
                                    fontSize: titleSize || "auto",
                                    color: 'white',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                                }}>
                                    {data?.title || 'Заголовок новости'}
                                </h1>
                                <div className="image-new-content_description" style={{color: 'rgba(255,255,255,0.9)'}}>
                                    {this.SliceText(data?.content, this.state.limit)}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

const NewsImages = () =>
{
    const {news} = useContext(Context)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [])

    useEffect(() => {
        if (isMobile)
        {
            const timer = setTimeout(() => {nextSlide()}, 4000)
            return () => {clearTimeout(timer)}
        }
    }, [isMobile, currentSlide]);

    const nextSlide = () =>
    {
        setCurrentSlide(prev => (prev + 1) % 3);
    }

    const prevSlide = () =>
    {
        setCurrentSlide(prev => (prev - 1 + 3) % 3);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="news-images">
            <div className="news-images-desktop">
                <div style={{display: "flex", height: "calc(65% - 10px)"}}>
                    <ImageNews data={news.news ? news.news[0] : {}} titleSize="32px"/>
                </div>
                <div style={{display: "flex", height: "35%"}}>
                    <ImageNews data={news.news ? news.news[1] : {}} titleSize="20px"/>
                    <ImageNews data={news.news ? news.news[2] : {}} titleSize="20px"/>
                </div>
            </div>

            <div className="news-images-mobile">
                <div
                    className="carousel-container"
                    style={{transform: `translateX(-${currentSlide * 100}%)`}}
                >
                    {news.news && news.news.slice(0, 3).map((item, index) => (
                        <div key={index} className="carousel-slide">
                            <ImageNews data={item} titleSize="24px"/>
                        </div>
                    ))}
                </div>

                <button className="carousel-arrow prev" onClick={prevSlide}>
                    ‹
                </button>
                <button className="carousel-arrow next" onClick={nextSlide}>
                    ›
                </button>

                <div className="carousel-dots">
                    {[0, 1, 2].map(index => (
                        <div
                            key={index}
                            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsImages;