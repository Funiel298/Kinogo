"use client"
import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow'; // Import any additional modules you need
import Slider from '@/components/Slider';
import GetData from '@/components/ServerGetData';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { use } from 'react';
import { FaPlay } from "react-icons/fa";
import Modal from '@/components/Modal';
import { LuStar } from "react-icons/lu";
import { RiFlag2Line } from "react-icons/ri";
import { GiRoundStar } from "react-icons/gi";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';
import InfoSection from '@/components/FilmComponent/Content';



const ServerPage = ({ params: { id } }: { params: Params }) => {
  const similar = use(GetData(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
  const post = use(GetData(`https://api.themoviedb.org/3/movie/${id}?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
  const trailers = use(GetData(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
  const casting = use(GetData(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));

  const API_IMG = 'https://image.tmdb.org/t/p/w500';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

  

  const [videoActive, setVideoActive] = useState(false)
  const [ratingActive, setRatingActive] = useState(false)
  const [isRated, setIsRated] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0);
  const [savedFilms, setSavedFilms] = useState<any>([]);

  function CloseRating(){
    setIsRated(true)
    setRatingActive(false)
  }
  

  const handleSaveFilm = () => {
    const isFilmSaved = savedFilms.some((film:any) => film.id === id);
  
    if (!isFilmSaved) {
      setSavedFilms([...savedFilms, { id }]);
    }
  };
  
  

  return (
    <div className="bg-gray-900 w-full overflow-hidden">
            <div className="flex flex-row ">
                <img className="w-full h-[30vh]  md:h-96 object-cover object-top" src={API_IMG + post.backdrop_path} alt="" />
                <div className="text-white r-0  absolute flex justify-end  h-[30vh] md:h-96 w-full bg-gradient-to-b from-transparent from-10% to-gray-900 to-100%" />
            </div>

            <div className="text-white w-full flex z-0 flex-col items-center justify-center">
                <InfoSection post={post} length={['Runtime', post.runtime]} release={post.release_date?.slice(8, 10) + ' ' + months[Number(post.release_date?.slice(5, 7)) - 1]} trailers={trailers} />

                <div className="w-11/12 my-5 flex justify-center items-center flex-col">
                    <Slider movies={casting.cast} tag={'Actors'} type={`Person`} />
                    <Slider movies={similar.results} tag={'Similar'} type={'filmPage'} />
                </div>
            </div>
        </div>
  )
}
export default ServerPage