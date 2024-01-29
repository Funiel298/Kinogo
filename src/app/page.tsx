"use client"
import React, { Suspense, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules";
import Slider from "../components/Slider"
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BigCard from "@/components/BigCard";
import SkeletonCard from "@/components/SkeletonCards";
import 'react-loading-skeleton/dist/skeleton.css'
import { Loading } from "@/components/Loading";

export default function Home() {

  const [movies, setMovies] = useState<any[]>([])
  const [topRated, setTopRated] = useState<any[]>([])
  const [upcoming, setUpcoming] = useState<any[]>([])
  const [nowPlaying, setNowPlaying] = useState<any[]>([])

 const API_IMG = "https://image.tmdb.org/t/p/w500/"
 const API_TOPRATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=f2e3189ddbb0312728c6ef6a85f9dede'
 const API_UPCOMING =  'https://api.themoviedb.org/3/movie/upcoming?api_key=f2e3189ddbb0312728c6ef6a85f9dede'
 const API_NOW =  'https://api.themoviedb.org/3/movie/now_playing?api_key=f2e3189ddbb0312728c6ef6a85f9dede'

 useEffect(() => {
  const fetchData = async () => {
    try {
      const popularResponse = await fetch(API_TOPRATED);
      const upcomingResponse = await fetch(API_UPCOMING);
      const topRatedResponse = await fetch(API_TOPRATED);
      const nowPlayingResponse = await fetch(API_NOW);

      const popularData = await popularResponse.json();
      const upcomingData = await upcomingResponse.json();
      const topRatedData = await topRatedResponse.json();
      const nowPlayingData = await nowPlayingResponse.json();

      setMovies(popularData.results);
      setUpcoming(upcomingData.results);
      setTopRated(topRatedData.results);
      setNowPlaying(nowPlayingData.results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  fetchData();
}, []);

  const breakpoints = {
    
    640: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1.65,
    },
  }

  const [isLoading, setIsLoading] = useState(true)

  


  return (
    <Suspense fallback={<Loading/>}>
      <div className="bg-gray-900 flex items-center justify-center">
        <div className="flex justify-center w-full flex-wrap items-center mt-10">

          <Swiper
            centeredSlides={true}
            centeredSlidesBounds={true}
            breakpoints={breakpoints}
            navigation={true}
            modules={[Navigation]}
            loop={true}
            pagination={{ clickable: true }}
            spaceBetween={5}
            className="relative group flex justify-center items-center overflow-hidden rounded-lg w-full min-h-[50vh] mx-2 my-5 mt-10"
          >
            {nowPlaying.map((film) => (
              <SwiperSlide key={film.id}>
                  {isLoading? (
                    <SkeletonCard/>
                  ):(
                    <BigCard
                      link={`filmPage/${film.id}`}
                      image={API_IMG + film.backdrop_path}
                      name={film.original_title}
                      rating={film.vote_average}
                      desc={film.overview}
                      year={film.release_date}
                    />
                  )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="w-11/12 flex justify-center items-center flex-col">
            <Slider movies={movies} tag={'Popular'} type={'filmPage'} />
            <Slider movies={topRated} tag={'Top Rated'} type={'filmPage'} />
            <Slider movies={upcoming} tag={'Upcoming'} type={'filmPage'} />
          </div>

        </div>
      </div>
    </Suspense>
  );
}
