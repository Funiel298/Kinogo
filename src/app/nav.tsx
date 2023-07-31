import Link from "next/link"
import Logo from './logo.png'

export default function Nav({children}:any){
    return(
        <>
           <header className=" bg-gray-900 flex flex-row justify-around items-center " >
                <nav className="border-b-2 border-gray-600  w-4/5 p-5 flex flex-row justify-around items-center">
                    <img src={Logo.src} alt="kinogo" width={50} />
                    <ul className="text-white flex flex-row justify-around w-1/3 text-gray-600 font-bold " >  
                       <li className="hover:text-gray-200 duration-500"><Link href={''}>Movies</Link></li>
                       <li className="hover:text-gray-200 duration-500"><Link href={''}>Series</Link></li>
                       <li className="hover:text-gray-200 duration-500"><Link href={''}>Cartoons</Link></li>
                       <li className="hover:text-gray-200 duration-500"><Link href={''}>Actors</Link></li>
                    </ul>
                     <button className="text-[#fa5252]">Login</button>
                </nav>
           </header>
           {children}

           <footer >
            <nav className="bg-gray-700 p-10">
                    <ul className="text-white" >  
                       
                    </ul>
                    <Link href={'hjhfu'}>jjdjd</Link> 
                </nav>
            </footer> 
        </>
    )
}