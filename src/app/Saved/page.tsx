'use client'
import React, { useEffect } from 'react';
import addFilmStore from '../store/AddFilm';
import { observer } from 'mobx-react-lite';

const SavedFilms = observer(() => {

  useEffect(()=>{
    console.log(addFilmStore.savedFilms)
  },[addFilmStore.savedFilms])

  return (
    <div className='flex justify-center items-center flex-col h-full'>
      <h1 className='text-white text-5xl border-b-2 pb-4 p-5 w-3/4 font-bold m-20'>Saved Films</h1>
      <div className='grid grid-cols-4  w-3/4 gap-3 p-5' >
        {addFilmStore.savedFilms.map((filmId) => (
            <h4 className='text-white text-9xl' key={filmId}>{filmId}</h4>
          ))}
      </div>
    </div>
  );
})

export default SavedFilms;
