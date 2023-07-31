'use client'
import React, { useEffect, useState, useRef } from "react"
import Card from './Card'
import SpecialCard from './SpecialCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function Slider({movies, tag}){
    const [swiper, setSwiper] = React.useState();
    const prevRef = React.useRef();
    const nextRef = React.useRef();

    return(
        <div className="overflow-hidden flex flex-col w-11/12 mt-10">
            <span className="text-xl text-white -mb-2 font-bold">{tag}</span>
            <div className="w-screen flex flex-row justify-center items-center">

                <Swiper
                slidesPerView={6}
                spaceBetween={30}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true
                }}
                    modules={[Pagination, Navigation]}
                    
                >
                        {movies?.map((film)=>
                            <SwiperSlide><Link href={`/filmPage/${film.id}`} className='ml-10'><Card key={film.id}  image={film.poster_path} name={film.title} rating={film.vote_average} desc={film.overview} duration={20} ></Card></Link> </SwiperSlide>
                        )}
                        <SwiperSlide><Link href={`/catalog`} className='ml-10'><SpecialCard></SpecialCard></Link></SwiperSlide>
                        <SwiperSlide><Link href={`/catalog`} className='ml-10'><SpecialCard></SpecialCard></Link></SwiperSlide>

                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </div>
                    </div>
                    
                    
                    
                </Swiper>
                </div>
        </div>
    )
}