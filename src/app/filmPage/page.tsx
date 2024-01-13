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
SwiperCore.use([Navigation, Mousewheel]);



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


const ranking =[6,7,8,9]


import React, { useState, useEffect } from 'react';
import fetchMoviesByGenre from '../../components/GenresData'; 
import { throttle } from 'lodash'

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
      <div className='flex flex-col w-screen pl-32 pr-32 mt-10'>
        <div className='flex flex-row  '>
            <Swiper 
            slidesPerView={7.5}
            spaceBetween={5}
            mousewheel={true}
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
        
        <div className='flex flex-row mt-5 items-center justify-between'>
            <div className='flex flex-row items-center'>
              <h1 className=' text-2xl font-bold text-white'>Ranking:</h1>
              <div>
                {ranking.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`p-3 font-bold text-sm 
                      ${selectedRating === rating ? 'duration-300 shadow-3xl bg-black text-black' : '  bg-black hover:bg-opacity-40 duration-300'} rounded-xl ml-5 text-white`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            <h1 className='text-white font-bold text-2xl'>You turned {genres.find((genre) => Number(genre.id) === Number(selectedGenre))?.name || 'All'} movies with {selectedRating} Ranking</h1>
        </div>
      </div>
      
      <div className="w-screen min-h-screen mt-5 flex justify-center items-center flex-row flex-wrap pb-10">
        {movies.map((film: any) => (
          <Link key={film.title + film.profile_path} href={`/filmPage/${film.id}`} className="mt-5 ml-5 mr-5 min-w-36 text-lg min-h-72 max-w-48">
            <Card
              image={film.poster_path || film.profile_path}
              name={film.title || film.name}
              rating={film.vote_average}
            />
          </Link>
        ))}
      </div>
      {isLoading && <p  className='text-white font-semibold text-sm pb-5 -mt-5'>Loading...</p>}
    </div>
  );
}


