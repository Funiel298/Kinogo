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


    const breakpoints = {
        360: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        760: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        850: {
        slidesPerView: 6,
        spaceBetween: 20,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 30,
        },
      }

    return(
            movies.length > 0 ? 
            
                <div className=" flex flex-col w-full justify-center  mt-1">

                    <span className="text-xl text-white -mb-4 font-bold">{tag}</span>
                    

                    <div className="w-full flex flex-row justify-center items-center">


                        <Swiper
                            slidesPerView={8}
                            spaceBetween={30}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            breakpoints = {breakpoints}
                            id="mySwiper"
                            className="w-full flex justify-center items-center"
                        >   
                                
                                {movies?.map((film)=>
                                    <SwiperSlide key={film.id}>
                                        <Link href={`/${type}/${film.id}`} className='ml-10'>
                                            <Card   
                                                image={film.poster_path || film.profile_path} 
                                                name={film.title || film.name} 
                                                rating={film.vote_average} >
                                            </Card>
                                        </Link> 
                                    </SwiperSlide>
                                )}



                                {movies?.length<20?
                                    null:
                                    <>
                                        <SwiperSlide>
                                            <Link href={`/filmPage`} className='ml-10'>
                                                <SpecialCard></SpecialCard>
                                            </Link>
                                        </SwiperSlide>
                                    </>
                                    
                                }
                        </Swiper>
                            
                    </div>
                </div>:
            null
        
    )
}