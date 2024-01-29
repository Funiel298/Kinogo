"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { throttle } from 'lodash';
import Card from '../../components/Card';
import fetchData from '../../components/GetActors'; 
import Link from 'next/link';
import { Loading } from '@/components/Loading';
import SkeletonCard from '@/components/SkeletonCards';

const genres = [
    // ... your genres data
];

const ranking = [6, 7, 8, 9];

const Actor = () => {
    const [actors, setActors] = useState<any[]>([]);
    const [selectedGender, setSelectedGender] = useState<string>(''); 
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
          setActors([]); 
          setCurrentPage(1); 
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
        const handleScrollThrottle = throttle(handleScroll, 200);
    
        window.addEventListener('scroll', handleScrollThrottle);
        return () => window.removeEventListener('scroll', handleScrollThrottle);
      }, [isLoading, hasMorePages]);

    return (
        <Suspense fallback={<Loading/>}>
          <div className='bg-gray-800 pt-16 flex flex-col p-3  justify-center overflow-hidden items-center'>
            <div className="w-full min-h-screen mt-5 grid gap-3 lg:grid-cols-4 text-lg xl:grid-cols-6  grid-cols-3 ">
                {actors.map((actor: any) => (
                    isLoading?(
                      <SkeletonCard/>
                    ):(
                      <Link key={actor.id} href={`/Person/${actor.id}`}>
                        <Card
                            image={actor.profile_path}
                            name={actor.name}
                            rating={actor.popularity}
                        />
                      </Link>
                    )
                ))}
            </div>
            {isLoading && <Loading/>}
          </div>
        </Suspense>
    );
};

export default Actor;
