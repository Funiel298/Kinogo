import Link from "next/link"
import Logo from './logo.png'

export default function Nav({children}:any){
    return(
        <>
           <header className=" flex flex-row justify-around items-center absolute z-10 mн-10 w-full" >
                <nav className="  w-4/5 py-2 flex flex-row justify-around items-center">
                    <Link href={'./'}><img src={Logo.src} alt="kinogo" width={50} /></Link>
                    <ul className=" flex flex-row justify-around w-1/3 duration-500 text-white font-medium " >  
                       <li className="hover:text-gray-300"><Link href={'/filmPage'}>Movies</Link></li>
                       <li className="hover:text-gray-300"><Link href={'/Series'}>Series</Link></li>
                       <li className="hover:text-gray-300"><Link href={'/Person'}>Actors</Link></li>
                    </ul>
                     <button className="text-[#fa5252]">Login</button>
                </nav>
           </header>
           {children}

           <footer className="bg-gray-800 ">
                <nav className=" w-full p-3 flex flex-row justify-around items-center">
                    <Link href={'./'}><img src={Logo.src} alt="kinogo" width={50} /></Link>
                    <ul className=" flex flex-row justify-around w-1/3 text-gray-400 font-bold " >  
                       <li className="hover:text-gray-50 duration-500"><Link href={'/filmPage'}>Movies</Link></li>
                       <li className="hover:text-gray-50 duration-500"><Link href={'Series'}>Series</Link></li>
                       <li className="hover:text-gray-50 duration-500"><Link href={'/Person'}>Actors</Link></li>
                    </ul>
                     <button className="text-[#fa5252]">Favourites</button>
                </nav>
            </footer> 
        </>
    )
}