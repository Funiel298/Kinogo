'use client'
import Slider from '../../components/Slider'
import Link from 'next/link'
import Card from '../../components/Card'
import { Swiper,SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
export * from '../../components/Slider'
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

const genres = [
  { name: 'Adventure', id: '10759', icon: <FiGlobe /> },
  { name: 'Animation', id: '16', icon: <FiSmile /> },
  { name: 'Comedy', id: '35', icon: <FiHeart /> },
  { name: 'Crime', id: '80', icon: <FiBookOpen /> },
  { name: 'Documentary', id: '99', icon: <FiMonitor /> },
  { name: 'Drama', id: '18', icon: <FiPlay /> },
  { name: 'Family', id: '10751', icon: <FiTarget /> },
  { name: 'Kids', id: '10762', icon: <FiAnchor /> },
  { name: 'Mystery', id: '9648', icon: <FiAlertTriangle /> },
  { name: 'News', id: '10763', icon: <FiDroplet /> },
  { name: 'Reality', id: '10764', icon: <FiCamera /> },
  { name: 'Fantasy', id: '10765', icon: <FiSun /> },
  { name: 'Soap', id: '10766', icon: <FiBriefcase /> },
  { name: 'Talk', id: '10767', icon: <GiTank /> },
  { name: 'Politics', id: '10768', icon: <MdOutlineScience /> },
  { name: 'Western', id: '37', icon: <FiTv /> },
];
  
const ranking =[6,7,8,9]

import React, { useState, useEffect } from 'react';
import fetchMoviesByGenre from '../../components/GenresData'; 
import { throttle } from 'lodash'
import { Loading } from '@/components/Loading'



const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Movie() {
    const [movies, setMovies] : any[] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(10759);
    const [selectedRating, setSelectedRating] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
  
    const fetchMoviesForCurrentPage = async () => {
      if (!hasMorePages || isLoading) {
        return;
      }
  
      setIsLoading(true);
      const newMovies = await fetchMoviesByGenre(selectedGenre, 'tv', selectedRating, currentPage);
      if (newMovies.length === 0) {
        setHasMorePages(false);
      } else {
        setMovies((prevMovies : any[]) => [...prevMovies, ...newMovies]);
        setCurrentPage(prevPage => prevPage + 1);
      }
      setIsLoading(false);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        setMovies([]); // Clear existing movies before fetching new ones
        setCurrentPage(1); // Reset current page to 1
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
      const handleScrollThrottle = throttle(handleScroll, 200); // Throttle the scroll event
  
      window.addEventListener('scroll', handleScrollThrottle);
      return () => window.removeEventListener('scroll', handleScrollThrottle);
    }, [isLoading, hasMorePages]);
  
    const handleGenreChange = (genreId: number) => {
      setSelectedGenre(genreId);
    };
  
    const handleRatingChange = (rating: number) => {
      setSelectedRating(rating);
    };

  return (
    <div className='bg-gray-900 overflow-hidden pt-10  px-4 md:px-10 lg:px-20 flex flex-col justify-center items-center'>
      <div className='flex flex-col w-11/12  mt-10'>
      <div className='flex flex-row justify-center items-center w-screen px-10 lg:p-0 lg:w-full'>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            mousewheel={true}
            breakpoints={{
              300: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              430: {
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
            }}
          >
            {genres.map((genre: any) => (
              <SwiperSlide key={`${genre.id}-${genre.name}`}>
                <button
                  onClick={() => setSelectedGenre(genre.id)}
                  className='relative py-5 px-8 font-semibold bg-gray-800 text-lg md:text-xl w-36 rounded-xl text-white flex justify-center items-center flex-col hover:bg-gray-700 transition-colors duration-300'
                >
                  <div className='mb-2'>{genre.icon}</div>
                  <span>{genre.name}</span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className='flex md:flex-row flex-col mt-5 lg:w-full w-full items-center justify-center md:justify-between'>
          <div className='flex flex-row flex-wrap justify-center items-center'>
            <h1 className='md:text-2xl text-xs font-bold text-white md:mb-2'>Ranking</h1>
            <div className='flex flex-wrap'>
              {ranking.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`w-[7vw] h-[7vw] md:w-[3vw] md:h-[3vw] font-bold text-xs md:text-sm 
                      ${selectedRating === rating ? 'duration-300 shadow-3xl bg-black text-black' : 'bg-black hover:bg-opacity-40 duration-300'} rounded-full ml-2 md:ml-5 text-white`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
          <h1 className='text-white font-bold md:text-2xl text-lg mt-2 md:mt-0'>
            {genres.find((genre) => Number(genre.id) === Number(selectedGenre))?.name || 'All'} movies with {selectedRating} Ranking
          </h1>
        </div>
      </div>
      
      <div className="w-full min-h-screen mt-5 grid gap-3 lg:grid-cols-4 text-lg xl:grid-cols-6  grid-cols-3 ">
        {movies.map((film: any) => (
          <Link key={film.title + film.profile_path} href={`/Series/${film.id}`} >
            <Card
              image={film.poster_path || film.profile_path}
              name={film.title || film.name}
              rating={film.vote_average}
            />
          </Link>
        ))}
      </div>
      {isLoading && <Loading/>}
    </div>
  );
}


