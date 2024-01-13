"use client"
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
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


const ServerPage = ({ params: { id } }: { params: Params }) => {
  const similar = use(GetData(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
  const post = use(GetData(`https://api.themoviedb.org/3/movie/${id}?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
  const trailers = use(GetData(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
  const casting = use(GetData(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));

  const API_IMG = 'https://image.tmdb.org/t/p/w500';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

  const breakpoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    760: {
      slidesPerView: 1.25,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 1.5,
      spaceBetween: 50,
    },
  };

  return (
    <div className="bg-gray-900 w-full overflow-hidden">

            <div className="flex flex-row">
                <img className="w-full   h-96 object-cover object-center" src={API_IMG + post.backdrop_path} alt="" />
                <div className="text-white r-0 absolute  flex justify-end h-96   w-full bg-gradient-to-b from-transparent  from-10% to-gray-900 to-100%"/>
                 
            </div>

            <div className="text-white w-full flex flex-col items-center justify-center">

                <div className="flex items-center justify-center w-full h-[100vh]">

                    <img className="rounded-3xl w-1/2 h-full object-cover" src={API_IMG+ post.poster_path} alt="" />

                    <div className="w-1/4 ml-20 ">   

                        <h1 className="text-3xl font-bold ">{post.title}</h1>

                        <div className="flex flex-row justify-between ">
                            <div className="flex flex-row items-center justify-center">
                                <h6 className="text-sm my-5">Rating:  </h6> 
                                <AiFillStar className=' ml-3'/>
                                <h6 className="text-sm ">{post.vote_average?.toFixed(1)} </h6>
                            </div>
                        </div>

                        <h4 className="text-sm  text-gray-300">{post.overview}</h4>


                        <div className='grid grid-cols-2 mt-5 gap-3 w-full h-[50vh] '>
                            
                            <button className='bg-green-600 w-full h-full flex items-center justify-center text-4xl  rounded-2xl'>
                                <FaPlay />    
                            </button>


                            <div className='col-span-2 md:col-span-1 flex-col  bg-black bg-opacity-30 w-full flex items-center justify-center h-full rounded-2xl'>
                                <p className='text-white opacity-30'>Genre</p>
                                <h2 className='text-white text-xl font-bold mb-2'>{post.genres[0]?.name}</h2>
                                
                            </div>


                            <div className='col-span-2 md:col-span-1 flex-col bg-black bg-opacity-30 w-full h-full flex items-center justify-center rounded-2xl'>
                                <p className='text-white opacity-30'>Release</p>
                                <h2 className='text-white text-xl font-bold mb-2'>{ post.release_date.slice(8,10) + ' ' +  months[Number(post.release_date.slice(5,7))-1]}</h2>
                                
                            </div>


                            <div className='col-span-2 md:col-span-1 flex-col bg-black bg-opacity-30 w-full h-full flex items-center justify-center rounded-2xl'>
                                <p className='text-white opacity-30'>Length</p>
                                <h2 className='text-white text-xl font-bold mb-2'>{post.runtime}min</h2>

                            </div>

                        </div>
                    </div>
                </div>

                
                         

                <div className="w-11/12 my-5 flex justify-center items-center flex-col">
                    <Slider movies={casting.cast} tag={'Actors'} type={`Person`}></Slider>
                    <Slider movies={similar.results} tag={'Similar'} type={'filmPage'}></Slider>
                    
                </div>
                
                
            </div>

 
        </div>
  );
};
export default ServerPage