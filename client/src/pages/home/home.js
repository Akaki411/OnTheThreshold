import React from 'react';
import Header from "../../components/header"
import HeaderContacts from "../../components/headerContacts"
import WorksBlock from "../../components/worksBlock";
import GrayBanner from "../../components/grayBanner";
import Footer from "../../components/footer";
import ImageNews from "../../components/imageNews";
import NewsList from "../../components/newsList";


const Home = () => {
    const data = {
        news: {
            info: {
                all: 35,
                limit: 5,
                offset: 1
            },
            content: [
                {
                    id: 1,
                    title: "Название новости",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 2,
                    title: "Название новости",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 3,
                    title: "Название новости",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 4,
                    title: "Название новости",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 5,
                    title: "Название новости",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                }
            ]
        },
        works: {
            info: {
                all: 35,
                limit: 5,
                offset: 1
            },
            content: [
                {
                    id: 1,
                    title: "Название рассказа",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 2,
                    title: "Название рассказа",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 3,
                    title: "Название рассказа",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 4,
                    title: "Название рассказа",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                },
                {
                    id: 5,
                    title: "Название рассказа",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique dolor a orci aliquam mollis. Mauris vel eros ut nunc sagittis bibendum et sed felis. Nunc a arcu eu orci ultricies lobortis at at elit. Maecenas sit amet mauris id urna lacinia sollicitudin. Donec consectetur tempor sapien, in varius tellus commodo vitae. Donec ex est, eleifend sed augue quis, eleifend feugiat eros",
                    img: "https://sun9-32.userapi.com/impg/hIqzT6HCWPejnaHCJpRNGXB_h5aQYLyZkMvXbA/Tgw4AFmBDoQ.jpg?size=800x637&quality=96&sign=2ac66fe7700217bb171729fcb27ac5f7&type=album",
                    date: "2021-09-27 15:22:53.679985+02"
                }
            ]
        }
    }
    return (
        <div className="wrapper">
            <div className="head-banner" id="first-bg">
                <div className="frame">
                    <Header active="main"/>
                    <HeaderContacts/>
                </div>
            </div>
            <div className="content">
                <div className="news frame">
                    <div className="news-images">
                        <div style={{display: "flex", height: "calc(65% - 10px)"}}>
                            <ImageNews data={data.news.content[0]} titleSize="32px"/>
                        </div>
                        <div style={{display: "flex", height: "35%"}}>
                            <ImageNews data={data.news.content[1]} titleSize="20px"/>
                            <ImageNews data={data.news.content[2]} titleSize="20px"/>
                        </div>
                    </div>
                    <NewsList data={data.news}/>
                </div>
            </div>
            <GrayBanner>
                <WorksBlock content={data.works}/>
            </GrayBanner>
            <div className="content">
                <Footer/>
            </div>
        </div>
    );
};

export default Home;