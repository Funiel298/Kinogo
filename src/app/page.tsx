'use client'
import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { BIZ_UDGothic } from "next/font/google"
import Card from "./components/Card"
import { Swiper, SwiperSlide } from 'swiper/react';
import BigCard from './components/BigCard'
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Slider from './components/Slider'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination } from 'swiper/modules';


async function getData() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=f2e3189ddbb0312728c6ef6a85f9dede')

    return response.json()
}




export default function Home() {

  const [movies, setMovies] = useState<any[]>([])
  const [topRated, setTopRated] = useState<any[]>([])
  const [upcoming, setUpcoming] = useState<any[]>([])

 const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=f2e3189ddbb0312728c6ef6a85f9dede"
 const API_IMG = "https://image.tmdb.org/t/p/w500/"
 const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=f2e3189ddbb0312728c6ef6a85f9dede&query'
 const API_TOPRATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=f2e3189ddbb0312728c6ef6a85f9dede'
 const API_UPCOMING =  'https://api.themoviedb.org/3/movie/upcoming?api_key=f2e3189ddbb0312728c6ef6a85f9dede'

  useEffect(()=>{
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      setMovies(data.results)
    })
  },[])

  useEffect(()=>{
    fetch(API_UPCOMING)
    .then((res)=>res.json())
    .then(data=>{
      setUpcoming(data.results)
    })
  },[])

  useEffect(()=>{
    fetch(API_TOPRATED)
    .then((res)=>res.json())
    .then(data=>{
      setTopRated(data.results)
    })
  },[])


  interface Film {
    name: string;
    image: string;
    rating: number;
    duration: number;
    description: string;
  }
  
  const films: Film[] = [
    {
      name: "Classroom of the elite",
      image: "https://animecorner.me/wp-content/uploads/2022/02/classroom-of-the-elite-sequel-TV-anime-1.jpg",
      rating: 9.2,
      duration: 175,
      description: "Ayanokouji Kiyotaka is a student of D-class, which is where the school dumps its 'inferior' students in order to ridicule them",
    },
    {
      name: "Pulp Fiction",
      image: "https://animotaku.fr/wp-content/uploads/2022/02/anime-classroom-of-the-elite-saison-2-key-visual.jpeg",
      rating: 8.9,
      duration: 154,
      description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
    {
      name: "The Dark Knight",
      image: "https://animotaku.fr/wp-content/uploads/2022/02/anime-classroom-of-the-elite-saison-2-key-visual.jpeg",
      rating: 9.0,
      duration: 152,
      description: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    },
    {
      name: "The Shawshank Redemption",
      image: "https://animotaku.fr/wp-content/uploads/2022/02/anime-classroom-of-the-elite-saison-2-key-visual.jpeg",
      rating: 9.3,
      duration: 142,
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      name: "Fight Club",
      image: "https://animotaku.fr/wp-content/uploads/2022/02/anime-classroom-of-the-elite-saison-2-key-visual.jpeg",
      rating: 8.8,
      duration: 139,
      description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    },
    {
      name: "The Matrix",
      image: "https://img.betaseries.com/ab_U36XLFgiFIqx7D6qPg2IYBCc=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F1a66b0e43dede0ddec971866ed14b808.jpg",
      rating: 8.7,
      duration: 136,
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    },
    {
      name: "Schindler's List",
      image: "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
      rating: 8.9,
      duration: 195,
      description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    },
    {
      name: "Forrest Gump",
      image: "https://m.media-amazon.com/images/M/MV5BYjU3M2Q4ZTUtMzJlMS00MTRmLWFlMDMtMTlmMjZlNmIxNGQ3XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
      rating: 8.8,
      duration: 142,
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    },
    {
      name: "The Lord of the Rings: The Return of the King",
      image: "https://m.media-amazon.com/images/M/MV5BMDZmYjc0NDMtM2VkNy00Yjc2LThiMGQtYjJkOWRiNzdlODQxXkEyXkFqcGdeQXVyNjc3NTI5MDY@._V1_FMjpg_UX1000_.jpg",
      rating: 8.9,
      duration: 201,
      description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    },
    {
      name: "Inception",
      image: "https://animotaku.fr/wp-content/uploads/2022/02/anime-classroom-of-the-elite-saison-2-key-visual.jpeg",
      rating: 8.8,
      duration: 148,
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    },
  ];
 
  




  return (
    <div className="bg-gray-900 flex justify-center" >
      <div className="flex justify-center w-full flex-wrap items-center mb-10">

      {
        //<div id="rarrow" className="font-bold text-red-400"></div>
      }
      <Swiper
        navigation={true}
        
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        
        pagination={{ clickable: true, dynamicBullets: true }}
        centeredSlides={true}
        
          modules={[Pagination, Navigation]}
          id="mySwiper"
          className="w-11/12"
        >
          {films.map((film)=>
            <SwiperSlide> <BigCard key={film} image={film.image} name={film.name} rating={film.rating} desc={film.description} duration={film.duration} ></BigCard> </SwiperSlide>
          )}
          
            
          
        </Swiper>
        <div className="w-11/12 flex justify-center items-center flex-col">    
            <Slider movies={movies} tag={'Popular'} />
            <Slider movies={topRated} tag={'Top Rated'} />
            <Slider movies={upcoming} tag={'Upcoming'} />
        </div>

        
        
      </div>
    </div>
  )
}
