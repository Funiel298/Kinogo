'use client'
import Slider from '../components/Slider'
import Link from 'next/link'
import Card from '../components/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import SwiperCore from 'swiper';
SwiperCore.use([Navigation]);



export * from '../components/Slider'

const genres = [
  { name: 'Action', id: '28'},
  { name: 'Adventure', id: '12' },
  { name: 'Animation', id: '16' },
  { name: 'Comedy', id: '35' },
  { name: 'Crime', id: '80' },
  { name: 'Documentary', id: '99' },
  { name: 'Drama', id: '18' },
  { name: 'Family', id: '10751' },
  { name: 'Fantasy', id: '14' },
  { name: 'History', id: '36' },
  { name: 'Horror', id: '27' },
  { name: 'Music', id: '10402' },
  { name: 'Mystery', id: '9648' },
  { name: 'Romance', id: '10749' },
  { name: 'Science Fiction', id: '878' },
  { name: 'TV Movie', id: '10770' },
  { name: 'Thriller', id: '53' },
  { name: 'War', id: '10752' },
  { name: 'Western', id: '37' }
];


const ranking =[6,7,8,9]


import React, { useState, useEffect } from 'react';
import fetchMoviesByGenre from '../components/GenresData'; 
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
    <div className='bg-gray-900 pt-5 flex flex-col justify-center items-center'>
      <div className='flex flex-col w-full pl-32 pr-32'>
        <div className='flex flex-row  '>
            <Swiper 
            slidesPerView={7}
            spaceBetween={5}
            navigation={true}
            >
            

            {genres.map((genre : any)=>(
                <SwiperSlide key={genre.id}>
                    <button  onClick={() => setSelectedGenre(genre.id)} 
                      className='py-8 font-semibold bg-gray-800 text-xl w-40 rounded-xl text-white flex justify-center items-center flex-col'>
                        {genre.name}
                    </button>
                  </SwiperSlide>
            ))}
            
            </Swiper>
            
            
            
        </div>
        <h1 className='mt-5 mb-5 text-2xl font-bold text-white'>Ranking</h1>
        <div className='flex flex-row items-center justify-between'>
            <div>
                {ranking.map((rating)=>(
                    <button key={rating} onClick={() => {setSelectedRating(rating)}} className='p-5 font-bold bg-gray-900 text-xl  rounded-xl mr-5 text-white'>{rating}</button>
                ))}
            </div>
            <h1 className='text-white font-bold text-2xl'>You turned movies with {selectedRating} Ranking</h1>
        </div>
      </div>
      
      <div className="w-11/12 mt-5 flex justify-center items-center flex-row flex-wrap pb-10">
        {movies.map((film: any) => (
          <Link key={film.id} href={`/filmPage/${film.id}`} className="mt-5 ml-5 mr-5">
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


