"use client"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import BigCard from '../components/BigCard'
import { Navigation } from "swiper/modules";
import Slider from "../components/Slider"

import SwiperCore from 'swiper';
SwiperCore.use([Navigation]);

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules


async function getData() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=f2e3189ddbb0312728c6ef6a85f9dede')

    return response.json()
}




export default function Home() {

  const [movies, setMovies] = useState<any[]>([])
  const [topRated, setTopRated] = useState<any[]>([])
  const [upcoming, setUpcoming] = useState<any[]>([])
  const [nowPlaying, setNowPlaying] = useState<any[]>([])

 const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=f2e3189ddbb0312728c6ef6a85f9dede"
 const API_IMG = "https://image.tmdb.org/t/p/w500/"
 const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=f2e3189ddbb0312728c6ef6a85f9dede&query'
 const API_TOPRATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=f2e3189ddbb0312728c6ef6a85f9dede'
 const API_UPCOMING =  'https://api.themoviedb.org/3/movie/upcoming?api_key=f2e3189ddbb0312728c6ef6a85f9dede'
 const API_NOW =  'https://api.themoviedb.org/3/movie/now_playing?api_key=f2e3189ddbb0312728c6ef6a85f9dede'

  useEffect(()=>{
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      setMovies(data.results)
    })
  },[])

  useEffect(()=>{
    fetch(API_UPCOMING)
    .then((res)=>res.json())
    .then(data=>{
      setUpcoming(data.results)
    })
  },[])

  useEffect(()=>{
    fetch(API_TOPRATED)
    .then((res)=>res.json())
    .then(data=>{
      setTopRated(data.results)
    })
  },[])

  useEffect(()=>{
    fetch(API_NOW)
    .then((res)=>res.json())
    .then(data=>{
      setNowPlaying(data.results)
    })
  },[])


  const breakpoints = {
    1024: {
      slidesPerView: 1,
    },
  }
  




  return (
    <div className="bg-gray-900 flex justify-center" >
      <div className="flex justify-center w-full flex-wrap items-center mt-10">

      
      <Swiper
        navigation={true}
        slidesPerView={3}
        loop={true}
        breakpoints = {breakpoints}
        centeredSlides={true}
        
          modules={[ Navigation]}
          className="w-full mt-5"
        >
          {nowPlaying.map((film)=>
            <SwiperSlide> 
              <BigCard 
                key={film.overview} 
                link={`filmPage/${film.id}`} 
                image={API_IMG+film.backdrop_path} 
                name={film.original_title} 
                rating={film.vote_average} 
                desc={film.overview} 
                year={film.release_date} >
              </BigCard> 
            
            </SwiperSlide>
          )}
          
            
          
        </Swiper>
        <div className="w-11/12 flex justify-center items-center flex-col">    
            <Slider movies={movies} tag={'Popular'} type={'filmPage'} />
            <Slider movies={topRated} tag={'Top Rated'} type={'filmPage'}/>
            <Slider movies={upcoming} tag={'Upcoming'} type={'filmPage'}/>
        </div>

        
        
      </div>
    </div>
  )
}
