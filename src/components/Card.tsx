import React from 'react';
import Link from 'next/link';

const Card = (props: any) => {
    const API_IMG = "https://image.tmdb.org/t/p/w500/"

  return (
    <div className="relative group overflow-hidden rounded-2xl  transform transition-transform duration-300 hover:scale-105 inset-0 bg-black">
            <img
                src={API_IMG + props.image}
                alt={props.name}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40 "
            />
            <div className="absolute text-white flex-col inset-0 flex items-start justify-between p-5 opacity-0 duration-300 group-hover:opacity-100">
                <span className="text-sm font-bold bg-gray-800 p-2 rounded-xl bg-opacity-70">{props.rating.toFixed(1)}</span>
                <p className="text-lg font-bold">{props.name}</p>
            </div>
    </div>
  );
};

export default Card;
