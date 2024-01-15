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

  const [videoActive, setVideoActive] = useState(false)
  const [ratingActive, setRatingActive] = useState(false)
  const [isRated, setIsRated] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0);
  function CloseRating(){
    setIsRated(true)
    setRatingActive(false)
  }
  const [savedFilms, setSavedFilms] = useState<any>([]);

  const handleSaveFilm = () => {
    const isFilmSaved = savedFilms.some((film:any) => film.id === id);
  
    if (!isFilmSaved) {
      setSavedFilms([...savedFilms, { id }]);
    }
  };
  

  return (
    <div className="bg-gray-900 w-full overflow-hidden">

            <div className="flex flex-row">
                <img className="w-full   h-96 object-cover object-center" src={API_IMG + post.backdrop_path} alt="" />
                <div className="text-white r-0 absolute  flex justify-end h-96   w-full bg-gradient-to-b from-transparent  from-10% to-gray-900 to-100%"/>
                 
            </div>

            <div className="text-white w-full flex flex-col items-center justify-center">

                <div className="flex items-center justify-center w-full h-[100vh]">

                    <img className="rounded-3xl w-1/2 h-full object-cover object-top" src={API_IMG+ post.poster_path} alt="" />

                    <div className="w-1/4 ml-20 ">   

                        <h1 className="text-3xl font-bold ">{post.title}</h1>

                        <div className="flex flex-row items-center my-3">
                                
                        <h6 className={`text-sm font-semibold p-3 rounded-xl ${post.vote_average > 6 ? 'bg-green-500' : 'bg-black bg-opacity-30'}`}> {post.vote_average?.toFixed(1)}</h6>
                        <button onClick={() => setRatingActive(true)} className='ml-5 text-xl bg-black bg-opacity-30 hover:bg-opacity-80 duration-500 p-3 rounded-xl'>
                            {isRated ? <GiRoundStar /> : <LuStar />}
                        </button>
                            <button onClick={handleSaveFilm} className='ml-5 text-xl rotate-90  bg-black bg-opacity-30 hover:bg-opacity-80 p-3 rounded-xl duration-500'><RiFlag2Line  /></button>
                        </div>

                        <h4 className="text-sm  text-gray-300">{post.overview}</h4>


                        <div className='grid grid-cols-2 mt-5 gap-3 w-full h-[50vh] '>
                            
                            <button onClick={()=>setVideoActive(!videoActive)} className='bg-green-500 hover:scale-110 duration-300 w-full h-full flex items-center justify-center text-4xl  rounded-2xl'>
                                <FaPlay />    
                            </button>


                            <div className='hover:scale-110 duration-300 col-span-2 md:col-span-1 flex-col  bg-black bg-opacity-30 w-full flex items-center justify-center h-full rounded-2xl'>
                                <p className='text-white opacity-30'>Genre</p>
                                <h2 className='text-white text-xl font-bold mb-2'>{post.genres?.[0]?.name}</h2>
                                
                            </div>


                            <div className='hover:scale-110 duration-300 col-span-2 md:col-span-1 flex-col bg-black bg-opacity-30 w-full h-full flex items-center justify-center rounded-2xl'>
                                <p className='text-white opacity-30'>Release</p>
                                <h2 className='text-white text-xl font-bold mb-2'>{ post.release_date?.slice(8,10) + ' ' +  months[Number(post.release_date?.slice(5,7))-1]}</h2>
                                
                            </div>


                            <div className='hover:scale-110 duration-300 col-span-2 md:col-span-1 flex-col bg-black bg-opacity-30 w-full h-full flex items-center justify-center rounded-2xl'>
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

        {ratingActive && <Modal active={ratingActive} setActive={setRatingActive}>
            <div className='flex mt-10 items-center justify-center flex-col p-20 rounded-3xl   bg-gray-900'>
                <h1 className='text-white mb-3 text-3xl font-bold'>Rate it on a 10-point scale</h1>
                <div className='flex items-center justify-center'>
                    {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className={`w-16 h-16 m-2 text-xl font-medium hover:bg-green-500 duration-700 flex items-center justify-center rounded-full 
                                    ${selectedRating >= index + 1 ? 'bg-green-500' : 'bg-gray-700'} 
                                    text-white cursor-pointer`}
                        
                        onClick={() => setSelectedRating(index + 1)} // Add this line to reset the selectedRating when clicked
                    >
                        {index + 1}
                        
                    </div>
                    ))}
                </div>
                <div className='flex flex-row justify-between w-full'>
                    <h6 className='text-gray-400'>Very Bad</h6>
                    <h6 className='text-gray-400'>Very Great</h6>
                </div>
                <button onClick={CloseRating} className='font-semibold mt-5 bg-white rounded-full p-5 text-xl'>Give a Rating</button>
            </div>

        </Modal>}

        {videoActive && <Modal active={videoActive} setActive={setVideoActive}>
            <iframe 
                className='
                    object-cover
                    rounded-3xl
                    cursor-pointer 
                    inline-block
                    w-[50vw] 
                    h-[30vw]'
                src={`https://www.youtube.com/embed/${trailers.results[0]?.key} `}
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                >

            </iframe>
        </Modal>}
 
        </div>
  );
};
export default ServerPage