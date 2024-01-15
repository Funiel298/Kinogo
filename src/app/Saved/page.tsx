import React from 'react';

const SavedFilms = ({ savedFilms }:any) => {
  return (
    <div>
      <h1>Saved Films</h1>
      <ul>
        {savedFilms?.map((film:any) => (
          <li key={film.id}>{film.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavedFilms;
