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


export default function Slider({movies, tag, type}){
    const [swiper, setSwiper] = React.useState();
    const prevRef = React.useRef();
    const nextRef = React.useRef();

    return(
        <div className="overflow-hidden flex flex-col w-11/12 mt-10">
            <span className="text-xl text-white -mb-2 font-bold">{tag}</span>
            <div className="w-screen flex flex-row justify-center items-center">

                {movies.length<=20 && movies.length>=7? 

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
                            <SwiperSlide key={film.id}><Link href={`/${type}/${film.id}`} className='ml-10'><Card   image={film.poster_path || film.profile_path} name={film.title || film.name} rating={film.vote_average} ></Card></Link> </SwiperSlide>
                        )}



                        {movies.length<20?
                            null:
                            <>
                                <SwiperSlide><Link href={`/catalog`} className='ml-10'><SpecialCard></SpecialCard></Link></SwiperSlide>
                                <SwiperSlide><Link href={`/catalog`} className='ml-10'><SpecialCard></SpecialCard></Link></SwiperSlide>
                            </>
                            
                        }

                        

                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </div>
                    </div>
                    
                    
                    
                </Swiper>: 
                    movies.length<7 && movies.length>0?
                        <div className="flex flex-row justify-start mt-5 w-full items-center">
                            {movies?.map((film)=>
                                <Link href={`/${type}/${film.id}`} className='ml-10'><Card   image={film.poster_path || film.profile_path} name={film.title || film.name} rating={film.vote_average} ></Card></Link>
                            )}
                        </div>
                    :
                    <h1 className="text-3xl text-white font-bold">No Data</h1>
                }
            </div>
        </div>
    )
}