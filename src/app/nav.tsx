"use client"
import Link from "next/link"
import Logo from './logo.png'
import { FaUser } from "react-icons/fa6";
import Search from "@/components/Search";
import { useState } from "@/components/Search";
export default function Nav({children}:any){
    const [active,setActive] = useState(false)
    return(
        <div className={active? "overflow-hidden": ""}>
           <header className=" flex flex-row justify-around items-center absolute z-10 mн-10 w-full" >
                <nav className="  w-4/5 py-2 flex flex-row justify-around items-center">
                    <Link href={'/'}><img src={Logo.src} alt="kinogo" width={50} /></Link>
                    <ul className=" flex flex-row justify-around w-1/3 duration-500 text-white font-medium " >  
                       <li className="hover:text-gray-300"><Link href={'/filmPage'}>Movies</Link></li>
                       <li className="hover:text-gray-300"><Link href={'/Series'}>Series</Link></li>
                       <li className="hover:text-gray-300"><Link href={'/Person'}>Actors</Link></li>
                    </ul>
                    <div className="flex flex-row text-white text-2xl justify-around ">
                        <span onClick={()=>setActive(!active)}>
                            <Search  />
                        </span>
                        <Link href={"/Admin"}><FaUser className=" cursor-pointer"/></Link>
                    </div>
                </nav>
           </header>
           <main className={`min-h-[90vh] bg-gray-900`}>
                {children}
            </main>

           <footer className="bg-gray-800 ">
                <nav className=" w-full p-3 flex flex-row justify-around items-center">
                    <Link href={'./'}><img src={Logo.src} alt="kinogo" width={50} /></Link>
                    <ul className=" flex flex-row justify-around w-1/3 text-gray-400 font-bold " >  
                       <li className="hover:text-gray-50 duration-500"><Link href={'/filmPage'}>Movies</Link></li>
                       <li className="hover:text-gray-50 duration-500"><Link href={'Series'}>Series</Link></li>
                       <li className="hover:text-gray-50 duration-500"><Link href={'/Person'}>Actors</Link></li>
                    </ul>
                    <div className="flex flex-row text-white text-2xl justify-around ">
                        <Search></Search>
                        <FaUser className=" cursor-pointer"/>
                    </div>
                </nav>
            </footer> 
        </div>
    )
}