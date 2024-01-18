// Import necessary packages and styles
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Card from './Card';
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';

// Use Swiper modules
SwiperCore.use([Navigation]);

export default function Slider({ movies, tag, type }) {
  // Define breakpoints for responsive design
  const breakpoints = {
    1024: { slidesPerView: 4, spaceBetween: 15 },
    1280: { slidesPerView: 5, spaceBetween: 20 },
  };
  return (
    <div className={`flex overflow-visible flex-col h-full w-full mb-5 md:mb-10 justify-center ${movies? "": hidden}`}>
      <h2 className={`md:text-2xl text-xl font-bold text-white ${movies? "": "hidden"}`}>{tag}</h2>

      <div className="w-full flex justify-center items-center">
        <Swiper
          slidesPerView={3}
          navigation
          spaceBetween={5}
          modules={{ Navigation }}
          pagination={{ clickable: true }}
          breakpoints={breakpoints}
          watchOverflow={true}
          className="w-full h-full overflow-visible"
        >
          {/* Map through movies to create Swiper slides */}
          {movies?.map((film) => (
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
