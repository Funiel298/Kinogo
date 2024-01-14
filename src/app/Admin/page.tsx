import { useState } from "react";

import { RiFlag2Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoTimerOutline } from "react-icons/io5";

const cards = [
    {
        name: "Saved",
        icon: <RiFlag2Line/>
    },
    {
        name: "Viewed",
        icon: <IoTimerOutline/>
    },
    {
        name: "Settings",
        icon: <IoMdSettings/>
    },
]
export default function Admin() {
    return (
        <div className=" pt-20 ">
            <div className="flex justify-center items-center">
                <div className="p-10 pb-0 w-[80vw] border-b-2 border-white border-solid flex flex-col justify-center">
                    
                    <h1 className="font-bold text-white text-5xl">Account Profile</h1>
                    <h4 className="text-xl text-gray-500">Main Page</h4>
                    
                </div>
            </div>

            <div className=" flex flex-row items-start p-10 justify-around text-white">
                {cards.map((card)=>(
                    <button className="py-10 w-[12vw] hover:scale-110 duration-500  bg-black bg-opacity-40 rounded-3xl text-lg font-semibold flex flex-col justify-center items-center">
                        <span className="text-4xl mb-5 rotate-90">{card.icon}</span>
                        <h1>{card.name}</h1>
                    </button>
                ))}
            </div>
        </div>
    );
}
