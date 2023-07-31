
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { Slider } from "../page" 
import {AiFillStar} from 'react-icons/ai'
async function getData(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f2e3189ddbb0312728c6ef6a85f9dede`)
        return response.json()

    }


    async function getSimilarMovies(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=f2e3189ddbb0312728c6ef6a85f9dede`)
        return response.json()

    }

    const months = ['January','February','March','April','May','June','Jule','August','September','October','November','December']



export default async function Page({params : { id }}){

    

    
    
    const similar = await getSimilarMovies(id)
    const post = await getData(id)
    const API_IMG = "https://image.tmdb.org/t/p/w500/"

    console.log(post.release_date.slice(5,6))
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
                            <h6 className="text-sm mt-3">Movie ({ post.release_date.slice(8,10) + ' ' +  months[Number(post.release_date.slice(5,7))-1] + "   " +   post.release_date.slice(0,4)}) </h6>
                            <div className="flex flex-row items-center justify-center">
                                <h6 className="text-sm mt-3">Rating:  </h6> 
                                <AiFillStar className='mt-3 ml-3'/>
                                <h6 className="text-sm mt-3">{post.vote_average} </h6>
                            </div>
                        </div>
                        <button className="bg-red-400 p-2 rounded-xl mt-3 mb-3" >Watch Trailer</button>
                        <h4 className="text-sm text-gray-300">{post.overview}</h4>
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
                            <h2 className="text-xl font-medium">Runtime</h2>
                            <p className="text-sm text-gray-600 ">{post.runtime} min</p>
                        </div>
                    </div>
                </div>
                </div>
                         

                <div className="w-11/12 mb-5 flex justify-center items-center">
                    <Slider movies={similar.results} tag={'Similar'}></Slider>
                </div>
                
                
            </div>

 
        </div>
        
    )
}