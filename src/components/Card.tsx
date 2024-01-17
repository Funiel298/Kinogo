import React from 'react';
import Link from 'next/link';

const Card = (props: any) => {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const fallbackImage = "https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png";

  const imageUrl = props.image ? API_IMG + props.image : fallbackImage;

  return (
    <div className="relative group overflow-hidden rounded-md md:rounded-2xl transform transition-transform duration-300 hover:scale-105 bg-black">
      <img
        src={imageUrl}
        alt={props.name}
        className="w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-40 "
      />
      <div className="absolute text-white flex flex-col inset-0 items-start justify-between p-3 sm:p-5 opacity-0 duration-300 group-hover:opacity-100 bg-gradient-to-b from-transparent to-black">
        {props.rating ? (
          <span className="text-xs sm:text-sm font-bold bg-gray-800 p-1 sm:p-2 rounded-xl bg-opacity-70">
            {props.rating?.toFixed(1)}
          </span>
        ) : null}
        <p className="text-sm sm:text-lg font-bold">{props.name}</p>
      </div>
    </div>
  );
};

export default Card;
