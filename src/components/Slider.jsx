// Import necessary packages and styles
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Card from './Card';
import SwiperCore from "swiper"
import SpecialCard from './SpecialCard';
SwiperCore.use([Navigation]);
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper';


export default function Slider({ movies, tag, type }) {
  // Define breakpoints for responsive design
  const breakpoints = {
    360: { slidesPerView: 2, spaceBetween: 5 },
    640: { slidesPerView: 3, spaceBetween: 10 },
    760: { slidesPerView: 4, spaceBetween: 10 },
    850: { slidesPerView: 5, spaceBetween: 20 },
    1024: { slidesPerView: 6, spaceBetween: 10 },
  };

  return (
    <div className="flex flex-col w-full justify-center ">
      <h2 className="text-2xl font-bold text-white -my-2">{tag}</h2>

      <div className="w-full flex justify-center items-center">
        <Swiper
          navigation 
          modules={{Navigation}}
          pagination={{ clickable: true }}
          breakpoints={breakpoints}
          watchOverflow={true}
          className="w-full h-96"
        >
          {/* Map through movies to create Swiper slides */}
          {movies.map((film) => (
            <SwiperSlide key={film.id}>
              <Link href={`/${type}/${film.id}`} className="ml-2">
                <Card
                  image={film.poster_path || film.profile_path}
                  name={film.title || film.name}
                  rating={film.vote_average}
                />
              </Link>
            </SwiperSlide>
          ))}

        
        </Swiper>
      </div>
    </div>
  );
}
