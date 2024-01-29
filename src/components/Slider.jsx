import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Card from './Card';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Skeleton, SkeletonTheme } from 'react-loading-skeleton';  
import { Suspense, useEffect, useState } from 'react';
import SkeletonCard from './SkeletonCards';


export default function Slider({ movies, tag, type }) {
  const breakpoints = {
    1024: { slidesPerView: 4, spaceBetween: 15 },
    1280: { slidesPerView: 5, spaceBetween: 20 },
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    setIsLoading(false);
    return () => clearTimeout(timer);
    
  }, []);

  return (
    <div className={`flex overflow-visible flex-col h-full w-full mb-5 md:mb-10 min-h-[50vh] justify-center ${movies ? "" : "hidden"}`}>
      {tag !== undefined && tag !== null && tag !== "" ? (
        <h2 className={`md:text-2xl text-xl font-bold text-white`}>{tag}</h2>
      ) : (
        <Skeleton height={30} width={'50%'} />
      )}

      <div className="w-full flex justify-center items-center">
        <Swiper
          slidesPerView={3}
          navigation
          spaceBetween={5}
          modules={[Navigation]}
          pagination={{ clickable: true }}
          breakpoints={breakpoints}
          watchOverflow={true}
          className="w-full h-full overflow-visible"
        >
          {movies?.map((film) => (
            <SwiperSlide key={film.id}>
              <Suspense fallback={SkeletonCard}>
                <Link href={`/${type}/${film.id}`} className="ml-2">
                  <Card
                    image={(film.poster_path || film.profile_path) || <Skeleton />}
                    name={(film.title || film.name) || <Skeleton />}
                    rating={film.vote_average}
                  />
                </Link>  
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}