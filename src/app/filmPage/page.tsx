'use client'
import Slider from '../../components/Slider'
import Link from 'next/link'
import Card from '../../components/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Mousewheel } from 'swiper/modules'

import {
  FiPlay,
  FiMap,
  FiSmile,
  FiHeart,
  FiBookOpen,
  FiMusic,
  FiCoffee,
  FiDroplet,
  FiFilm,
  FiMonitor,
  FiGlobe,
  FiAlertTriangle,
  FiCamera,
  FiTv,
  FiBriefcase,
  FiTarget,
  FiAnchor,
  FiSun,
} from 'react-icons/fi';
import { MdOutlineScience } from "react-icons/md";
import { GiTank } from "react-icons/gi";
import SwiperCore from 'swiper';



export * from '../../components/Slider'

const genres = [
  { name: 'Action', id: '28', icon: <FiPlay /> },
  { name: 'Adventure', id: '12', icon: <FiMap /> },
  { name: 'Animation', id: '16', icon: <FiSmile /> },
  { name: 'Comedy', id: '35', icon: <FiHeart /> },
  { name: 'Crime', id: '80', icon: <FiBookOpen /> },
  { name: 'Documentary', id: '99', icon: <FiMonitor /> },
  { name: 'Drama', id: '18', icon: <FiGlobe /> },
  { name: 'Family', id: '10751', icon: <FiTarget /> },
  { name: 'Fantasy', id: '14', icon: <FiCamera /> },
  { name: 'History', id: '36', icon: <FiBriefcase /> },
  { name: 'Horror', id: '27', icon: <FiSun /> },
  { name: 'Music', id: '10402', icon: <FiMusic /> },
  { name: 'Mystery', id: '9648', icon: <FiAlertTriangle /> },
  { name: 'Romance', id: '10749', icon: <FiHeart /> },
  { name: 'Science', id: '878', icon: <MdOutlineScience/>},
  { name: 'TV', id: '10770', icon: <FiTv />  },
  { name: 'Thriller', id: '53', icon: <FiDroplet /> },
  { name: 'War', id: '10752', icon: <GiTank/> },
  { name: 'Western', id: '37', icon: <FiAnchor /> },
];

const breakpoints = {
  300: {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  590: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  780: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 40,
  },
  1280: {
    slidesPerView: 7.5,
    spaceBetween: 50,
  },
}


const ranking =[6,7,8,9]


import React, { useState, useEffect } from 'react';
import fetchMoviesByGenre from '../../components/GenresData'; 
import { throttle } from 'lodash'
import { Loading } from '@/components/Loading'
import SkeletonCard from '@/components/SkeletonCards'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Movie() {
  const [movies, setMovies] : any[] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(12);
    const [selectedRating, setSelectedRating] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
  
    const fetchMoviesForCurrentPage = async () => {
      if (!hasMorePages || isLoading) {
        return;
      }
  
      setIsLoading(true);
      const newMovies = await fetchMoviesByGenre(selectedGenre, 'movie', selectedRating, currentPage);
      if (newMovies.length === 0) {
        setHasMorePages(false);
      } else {
        setMovies((prevMovies: any[]) => [...prevMovies, ...newMovies]);
        setCurrentPage(prevPage => prevPage + 1);
      }
      setIsLoading(false);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        setMovies([]); 
        setCurrentPage(1);
        setHasMorePages(true);
        await fetchMoviesForCurrentPage();
      };
  
      fetchData();
    }, [selectedGenre, selectedRating]);
  
    const handleScroll = () => {
      if (!isLoading && hasMorePages && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchMoviesForCurrentPage();
      }
    };
  
    useEffect(() => {
      const handleScrollThrottle = throttle(handleScroll, 200); 
  
      window.addEventListener('scroll', handleScrollThrottle);
      return () => window.removeEventListener('scroll', handleScrollThrottle);
    }, [isLoading, hasMorePages]);
  
  
  return (
    <div className='bg-gray-900 overflow-hidden pt-10  px-4 md:px-10 lg:px-20 flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center w-11/12 mt-10'>
        <div className='flex flex-row justify-center items-center w-screen px-10 lg:p-0 lg:w-full'>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            mousewheel={true}
            breakpoints={breakpoints}
            modules={[Mousewheel]}
          >
            {genres.map((genre: any) => (
              <SwiperSlide key={`${genre.id}-${genre.name}`}>
                {isLoading?(
                  <SkeletonCard/>
                ):(
                  <button
                    onClick={() => setSelectedGenre(genre.id)}
                    className='relative py-5 px-8 font-semibold bg-gray-800 text-lg md:text-xl w-36 rounded-xl text-white flex justify-center items-center flex-col hover:bg-gray-700 transition-colors duration-300'
                  >
                    <span className='mb-2'>{genre.icon}</span>
                    <span>{genre.name}</span>
                  </button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
            
            
        
        <div className='flex md:flex-row flex-col mt-5 lg:w-full w-full items-center justify-center md:justify-between'>
          <div className='flex flex-row flex-wrap justify-center items-center'>
            <h1 className='md:text-2xl text-xs font-bold text-white md:mb-2'>Ranking</h1>
            <div className='flex flex-wrap'>
              {ranking.map((rating) => (
                isLoading ? (
                  <SkeletonCard />
                ): (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`w-[7vw] h-[7vw] md:w-[3vw] md:h-[3vw] font-bold text-xs md:text-sm 
                        ${selectedRating === rating ? 'duration-300 shadow-3xl bg-black text-black' : 'bg-black hover:bg-opacity-40 duration-300'} rounded-full ml-2 md:ml-5 text-white`}
                  >
                    {rating}
                  </button>
                )
              ))}
            </div>
          </div>

          {isLoading?(
            <SkeletonCard/>
          ):(
            <h1 className='text-white font-bold md:text-2xl text-lg mt-2 md:mt-0'>
              {genres.find((genre) => Number(genre.id) === Number(selectedGenre))?.name || 'All'} movies with {selectedRating} Ranking
            </h1>
          )}

        </div>
      </div>
      
      <div className="w-full min-h-screen mt-5 grid gap-3 lg:grid-cols-4 xl:grid-cols-6 grid-cols-3 ">
        {movies.map((film: any) => (
          isLoading ? (
            <SkeletonCard />
          ) : (
            <Link key={film.title + film.profile_path} href={`/filmPage/${film.id}`} className=" text-lg  ">
              <Card
                image={film.poster_path || film.profile_path}
                name={film.title || film.name}
                rating={film.vote_average}
              />
            </Link>
          )
        ))}
      </div>
      {isLoading && <Loading />}

    </div>
  )
}


