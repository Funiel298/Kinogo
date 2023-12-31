'use client'




import GetData from '../../components/ServerGetData'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import {AiFillStar} from 'react-icons/ai'
import { use } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import Slider from '../../components/Slider'




 


   


    const months = ['January','February','March','April','May','June','Jule','August','September','October','November','December']



export default function Page({params : { id }}){

    // https://api.themoviedb.org/3/movie/457332/credits?api_key=f2e3189ddbb0312728c6ef6a85f9dede

    
    
    const similar = use(GetData(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=f2e3189ddbb0312728c6ef6a85f9dede`))
    const post = use(GetData(`https://api.themoviedb.org/3/tv/${id}?api_key=f2e3189ddbb0312728c6ef6a85f9dede`))
    const trailers = use(GetData(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=f2e3189ddbb0312728c6ef6a85f9dede`))
    const casting = use(GetData(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=f2e3189ddbb0312728c6ef6a85f9dede`))
    console.log(trailers)
    const API_IMG = "https://image.tmdb.org/t/p/w500/"

    console.log(post.first_air_date?.slice(5,6))
    return(
        <div className="bg-gray-900">
            <div className="flex flex-row">
                <img className="w-full  h-96 object-cover object-center" src={API_IMG + post.backdrop_path} alt="" />
                <div className="text-white r-0 absolute  flex justify-end h-96   w-full bg-gradient-to-b from-transparent  from-10% to-gray-900 to-100%"/>
                 
            </div>
            <div className="text-white flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                    <img width={300} className="rounded-3xl" src={API_IMG+ post.poster_path} alt="" />
                    <div className="w-1/4 ml-20">   
                        <h1 className="text-3xl font-bold ">{post.title}</h1>
                        <div className="flex flex-row justify-between ">
                            <h6 className="text-sm mt-3 mr-2">Series   (from { post.first_air_date?.slice(8,10) + ' ' +  months[Number(post.first_air_date?.slice(5,7))-1] + "   " +   post.first_air_date?.slice(0,4)} to { post.last_air_date?.slice(8,10) + ' ' +  months[Number(post.last_air_date?.slice(5,7))-1] + "   " +   post.last_air_date?.slice(0,4)})</h6>
                            <div className="flex flex-row items-center justify-center">
                                <h6 className="text-sm mt-3">Rating:  </h6> 
                                <AiFillStar className='mt-3 ml-3'/>
                                <h6 className="text-sm mt-3">{post.vote_average} </h6>
                            </div>
                        </div>
                        <a href="#mySwiper"><button className="bg-red-400 p-2 rounded-xl mt-3 mb-3" >Watch Trailer</button></a>                        <h4 className="text-sm text-gray-300">{post.overview}</h4>
                        <div className=" mt-4">
                            <h1 className="text-2xl font-bold">Details</h1>

                        <div className="border-b-2 mt-4 mb-2 flex flex-row justify-between items-center">
                            <h2 className="text-xl font-medium">Genres</h2>
                            <div className="flex flex-row flex-wrap justify-end w-3/5">
                                {post.genres?.map((film)=>{
                                    return(<p key={film} className="text-sm text-gray-600 ml-1 ">{film.name}</p>)
                                })}
                            </div>
                        </div>
                        <div className="border-b-2  mb-2 flex flex-row justify-between items-center">
                            <h2 className="text-xl font-medium">Country of origins:</h2> 
                            <div  className="flex flex-row flex-wrap justify-end w-3/5">
                                {post.production_countries?.map((film)=>{
                                    return(<p key={film} className="text-sm text-gray-600 ml-1">{film.name}</p>)
                                })}
                                
                            </div>
                        
                            
                            <p className="text-sm text-gray-600 ">{post.origin_country}</p>

                        </div>
                        <div className="border-b-2 mb-2 flex flex-row justify-between items-center">
                            <h2 className="text-xl font-medium">Episodes</h2>
                            <p className="text-sm text-gray-600 ">{post.number_of_episodes}</p>
                        </div>
                    </div>
                </div>
                </div>

                <Swiper
                    navigation={true}
                    slidesPerView={2}
                    centeredSlides={true}
                    modules={[Pagination, Navigation]}
                    id="mySwiper"
                    className="w-10/12 mt-10 p-10"
                    >
                    {trailers.results.map((film)=>
                        <SwiperSlide>
                            <div className="  h-auto mb-10  flex flex-col items-center">
                                <iframe 
                                    className='
                                        object-cover
                                        rounded-3xl
                                        cursor-pointer  '
                                    width="560" 
                                    height="315" 
                                    src={`https://www.youtube.com/embed/${film.key} `}
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowfullscreen>

                                </iframe>
                                
                                
                                <div className='
                                    select-none
                                    text-white
                                    flex  
                                    mt-2
                                    justify-between
                                    items-center'>
                                    
                                    
                                    {film.name?.length<30 ? 
                                        <h3 className='font-bold text-white text-sm'>
                                            {film.name}
                                            </h3>
                                            :
                                        <h3 className='font-bold text-white text-sm'>
                                            {film.name?.slice(0,30)+'...'}
                                            </h3> }


                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
                         

                <div className="w-11/12 mb-5 flex justify-center items-center flex-col">
                    <Slider movies={casting.cast} tag={'Actors'} type={'Person'}></Slider>
                    <Slider movies={similar.results} tag={'Similar'} type={'Series'}></Slider>
                    
                </div>
                
                
            </div>

 
        </div>
        
    )
}