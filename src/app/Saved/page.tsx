'use client'
import React, { useEffect } from 'react';
import addFilmStore from '../store/AddFilm';
import { observer } from 'mobx-react-lite';
import Card from '@/components/Card';
import Link from 'next/link';
const SavedFilms = observer(() => {

  useEffect(()=>{
    console.log(addFilmStore.savedFilms)
  },[addFilmStore.savedFilms])

  return (
    <div className='flex justify-center items-center flex-col h-full'>
      <h1 className='text-white text-5xl border-b-2 pb-4 p-5 w-3/4 font-bold m-20'>Saved Films</h1>
      <div className="w-3/4  mt-5 grid gap-3 lg:grid-cols-4 text-lg xl:grid-cols-6 grid-cols-3">
        {addFilmStore.savedFilms.map((film: any) => (
          <Link key={film.title + film.profile_path} href={`/Series/${film.id}`}>
            <Card image={film.poster_path || film.profile_path} name={film.title || film.name} rating={film.vote_average} />
          </Link>
        ))}
      </div>
    </div>
  )
})

export default SavedFilms
