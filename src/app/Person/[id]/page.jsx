'use client'




import GetData from '../../../components/ServerGetData'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { Slider } from "../page" 
import {AiFillStar} from 'react-icons/ai'
import { use } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import getData from '../../../components/ServerGetData'
import Skeleton from 'react-loading-skeleton'


 


   


    const months = ['January','February','March','April','May','June','Jule','August','September','October','November','December']



export default function Page({params : { id }}){

    // https://api.themoviedb.org/3/movie/457332/credits?api_key=f2e3189ddbb0312728c6ef6a85f9dede

    
    
    const post = use(getData(`https://api.themoviedb.org/3/person/${id}?api_key=f2e3189ddbb0312728c6ef6a85f9dede`))
    const API_IMG = "https://image.tmdb.org/t/p/w500/"

    console.log(post.birthday?.slice(5,6))
    return(
        <div className="bg-gray-900 min-h-screen">
            <div className="text-white flex  flex-col items-center justify-center">
                <div className="flex mt-[20vh] items-center justify-center m-10">
                    <img width={300} className="rounded-3xl" src={API_IMG+ post.profile_path} alt="" />
                    <div className="w-96 ml-20">   
                        <h1 className="text-3xl font-bold ">{post.name || <Skeleton />}</h1>
                        <div className="flex flex-col justify-between w-full ">
                            <h6 className="text-sm mt-3">Birthday:   
                                { 
                                    (post.birthday) ? 
                                    (post.birthday?.slice(8,10) + ' ' +  months[Number(post.birthday?.slice(5,7))-1] + "   " +   post.birthday?.slice(0,4)|| <Skeleton/> )
                                    : 
                                    <span className="text-sm mt-3">The same day as Jesus, actually I don't know</span>
                                }
                            </h6>
                            <div className="flex flex-row items-center justify-center">
                                {post.deathday? 
                                    <h6 className="text-sm mt-3">Deathday:  {post.deathday  || <Skeleton/>}</h6>: null }
                                
                                
                            </div>
                            <h6 className="text-sm mt-3">Known for: {post.known_for_department  || <Skeleton/>} </h6>
                        </div>
                        <h4 className="text-sm text-gray-300">{post.overview || <Skeleton /> }</h4>
                        <h4 className="text-sm text-gray-300">{post.biography || <Skeleton count={5}/> }</h4>
                        <div className=" mt-4">
                            <h1 className="text-2xl font-bold">Details</h1>

                        <div className="border-b-2 mt-4 mb-2 flex flex-row justify-between items-center">
                            <h2 className="text-xl font-medium">Place of birth</h2>
                            <div className="flex flex-row flex-wrap justify-end w-3/5">
                                <p key={post} className="text-sm text-gray-600 ml-1">
                                    {post.place_of_birth? post.place_of_birth || <Skeleton/>
                                 : 
                                    <p key={post} className="text-sm text-gray-600 ml-1">Maybe somewhere in US?</p>}
                                </p>
                            </div>
                        </div>

                        <div className="border-b-2  mb-2 flex flex-row justify-between items-center">
                            <h2 className="text-xl font-medium">Popularity:</h2> 
                            <div  className="flex flex-row flex-wrap justify-end w-3/5">
                                <p className="text-sm text-gray-600 ">{post.popularity || <Skeleton />}</p> 
                            </div>

                        </div>
                    </div>
                </div>
                </div>

                
                
                
            </div>

 
        </div>
        
    )
}