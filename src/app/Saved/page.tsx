'use client'
import React from 'react';
import addFilmStore from '../store/AddFilm';

const SavedFilms = () => {
  const savedFilms = addFilmStore.getSavedFilms();

  return (
    <div className='flex justify-start items-center h-full'>
      <h1 className='text-white text-5xl border-b-2 pb-4 w-full font-bold m-20'>Saved Films</h1>
      {savedFilms.map((filmId) => (
          <h4 className='text-white text-9xl' key={filmId}>{filmId}</h4>
        ))}
    </div>
  );
};

export default SavedFilms;
