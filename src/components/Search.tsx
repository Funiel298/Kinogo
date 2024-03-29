"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import {
  FiPlay,
  FiMap,
  FiSmile,
  FiHeart,
  FiBookOpen,
  FiMusic,
  FiCoffee,
  FiDroplet,
  FiFilm,
  FiMonitor,
  FiGlobe,
  FiAlertTriangle,
  FiCamera,
  FiTv,
  FiBriefcase,
  FiTarget,
  FiAnchor,
  FiSun,
} from 'react-icons/fi';
import { MdOutlineScience } from "react-icons/md";
import { GiTank } from "react-icons/gi";
export { useState } from "react"
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "./SkeletonCards";

const genres = [
  { name: 'Action', id: '28', icon: <FiPlay /> },
  { name: 'Adventure', id: '12', icon: <FiMap /> },
  { name: 'Animation', id: '16', icon: <FiSmile /> },
  { name: 'Comedy', id: '35', icon: <FiHeart /> },
  { name: 'Crime', id: '80', icon: <FiBookOpen /> },
  { name: 'Documentary', id: '99', icon: <FiMonitor /> },
  { name: 'Drama', id: '18', icon: <FiGlobe /> },
  { name: 'Family', id: '10751', icon: <FiTarget /> },
  { name: 'Fantasy', id: '14', icon: <FiCamera /> },
  { name: 'History', id: '36', icon: <FiBriefcase /> },
  { name: 'Horror', id: '27', icon: <FiSun /> },
  { name: 'Music', id: '10402', icon: <FiMusic /> },
  { name: 'Mystery', id: '9648', icon: <FiAlertTriangle /> },
  { name: 'Romance', id: '10749', icon: <FiHeart /> },
  { name: 'Science', id: '878', icon: <MdOutlineScience/>},
  { name: 'TV', id: '10770', icon: <FiTv />  },
  { name: 'Thriller', id: '53', icon: <FiDroplet /> },
  { name: 'War', id: '10752', icon: <GiTank/> },
  { name: 'Western', id: '37', icon: <FiAnchor /> },
];




export default function Search() {
  const [active, setActive] = useState(false);
  const API_KEY = "f2e3189ddbb0312728c6ef6a85f9dede";
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

  useEffect(() => {
    setLoading(true);
    fetch(SEARCH_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results);
        setLoading(false);
      });
  }, [SEARCH_URL]);

  const genresMap = genres.reduce((acc: any, { id, name }: any) => {
    acc[id] = name;
    return acc;
  }, {});


  return (
    <>
      <IoSearch
        onClick={() => setActive(true)}
        className="mr-10 cursor-pointer"
      />

      <div
        className={
          active
            ? `fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50 overflow-y-scroll`
            : `hidden`
        }
      >
        <div className="z-50 w-1/2">
          <h1 className="mb-5 font-bold text-3xl">Search</h1>
          <IoCloseSharp
            className="fixed left-3 top-3 text-4xl text-gray-400 hover:text-gray-200 duration-500 "
            onClick={() => setActive(false)}
          />
          <input
            placeholder="Movie&Series"
            type="text"
            className="text-sm w-full ml-auto mr-auto mb-10 p-3 focus:outline-none text-black rounded-xl z-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4 h-[50vh]">
            {items.map((card: any) => (
              <Link onClick={() => setActive(false)} key={card} href={`/filmPage/${card.id}`}>
                <div className="flex flex-row min-h-[22vh]  rounded-md shadow-md transition duration-300 transform hover:scale-105">
                    {loading && card.poster_path === null ?(
                      <SkeletonCard/>
                    ):(
                      <img
                        src={card.poster_path ? `https://image.tmdb.org/t/p/w300/${card.poster_path}` : "https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png"} alt={card.title}
                        className="rounded-md mb-2 w-[7vw] object-contain object-top h-full"
                      />
                    )}
                    <div className="flex flex-col items-start justify-around ml-5">
                      <h3 className="text-xl font-bold ">{card.title || <Skeleton/>}</h3>
                      <div className="flex flex-col">
                        <h1 className="text-lg mb-2 font-medium">{genresMap[card.genre_ids[0]] || <Skeleton/>}</h1>
                        <span style={{ width: 'fit-content' }} className="text-sm font-medium bg-gray-800 inline-block p-2 rounded-xl bg-opacity-70">{card.vote_average?.toFixed(1)  || <Skeleton/>}</span>
                      </div>
                    </div>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

