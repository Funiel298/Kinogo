"use client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { throttle } from 'lodash';
import Card from '../components/Card';
import fetchData from '../components/GetActors'; // Import your data fetching function here
import Link from 'next/link';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const genres = [
    // ... your genres data
];

const ranking = [6, 7, 8, 9];

const Actor: React.FC = () => {
    const [actors, setActors] = useState<any[]>([]); // Replace any with proper type
    const [selectedGender, setSelectedGender] = useState<string>(''); // Change to string
    const [selectedPopularity, setSelectedPopularity] = useState<number>(9);
    const [currentPage, setCurrentPage] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);

    const fetchMoviesForCurrentPage = async () => {
        if (!hasMorePages || isLoading) {
          return;
        }
    
        setIsLoading(true);
        const newActors = await fetchData(currentPage);
        if (newActors.length === 0) {
          setHasMorePages(false);
        } else {
          setActors((prevActors: any[]) => [...prevActors, ...newActors]);
          setCurrentPage(prevPage => prevPage + 1);
        }
        setIsLoading(false);
      };
    
      useEffect(() => {
        const fetchData = async () => {
          setActors([]); // Clear existing movies before fetching new ones
          setCurrentPage(1); // Reset current page to 1
          setHasMorePages(true);
          await fetchMoviesForCurrentPage();
        };
    
        fetchData();
      }, [selectedGender, selectedPopularity]);
    
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

    return (
        <div className='bg-gray-800 pt-10 flex flex-col justify-center items-center'>
            {/* ... your existing JSX */}
            <div className="w-11/12 mt-5 flex justify-center items-center flex-row flex-wrap pb-10">
                {actors.map((actor: any) => (
                    <Link key={actor.id} href={`/Person/${actor.id}`} className="m-10">
                        <Card
                            image={actor.profile_path}
                            name={actor.name}
                            rating={actor.popularity}
                        />
                    </Link>
                ))}
            </div>
            {isLoading && <p className='text-white font-semibold text-sm pb-5 -mt-5'>Loading...</p>}
        </div>
    );
};

export default Actor;
