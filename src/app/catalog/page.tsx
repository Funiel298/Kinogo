'use client'
import Card from "../components/Card"
import React, { useEffect, useState } from "react"
import Link from "next/link"

export default function Catalog(){
    
    const [movies, setMovies] = useState<any[]>([])
    for(let i=0;i<500;i++){
        useEffect(()=>{
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f2e3189ddbb0312728c6ef6a85f9dede&sort_by=popularity.desc&with_genres=28&page=${i}`)
            .then((res)=>res.json())
            .then(data=>{
              setMovies(() => [...movies,data.results])
            })
          },[])
    }

    return(
        <div className="flex justify-center items-center flex-wrap">
            {movies?.map((film)=>
                <Link href={`/filmPage/${film.id}`} className='ml-10'><Card key={film.id}  image={film.poster_path} name={film.title} rating={film.vote_average} desc={film.overview} duration={20} ></Card></Link>
            )}
        </div>
    )
}