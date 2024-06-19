import React, {useContext} from 'react';
import ImageNews from "./imageNews";
import {Context} from "../../index";

const NewsImages = () => {
    const {news} = useContext(Context)
    return (
        <div className="news-images">
            <div style={{display: "flex", height: "calc(65% - 10px)"}}>
                <ImageNews data={news.news ? news.news[0] : {}} titleSize="32px"/>
            </div>
            <div style={{display: "flex", height: "35%"}}>
                <ImageNews data={news.news ? news.news[1] : {}} titleSize="20px"/>
                <ImageNews data={news.news ? news.news[2] : {}} titleSize="20px"/>
            </div>
        </div>
    );
};

export default NewsImages;