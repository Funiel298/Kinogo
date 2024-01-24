import React from 'react';
import addFilm from '../store/AddFilm';
const SavedFilms = () => {
  return (
    <div className='flex justify-start items-center h-full'>
      <h1 className='text-white text-5xl border-b-2 pb-4  w-full font-bold m-20'>Saved Films</h1>
      <ul>
        {addFilm.savedFilms?.map((film:any) => (
          <li key={film}>{film}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavedFilms;
