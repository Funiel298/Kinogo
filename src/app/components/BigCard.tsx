import Link from "next/link"
export default function Card(props: any){
    
    //hover:opacity-100 duration-500


    

    return(
        <div className=" h-full rounded-3xl mr-5  w-128  flex flex-col  ">
            <h1 className="absolute p-10 font-semibold text-sm text-white z-10"><span className="p-3 bg-gray-500 rounded-xl">Playing Now</span></h1>
            <img src={props.image} alt="film_image"
                className='
                rounded-3xl
                object-cover
                 rounded-5xl
                  cursor-pointer
                   opacity-60
                       ' />

            <div className="absolute h-full flex flex-col mb-10 p-10 justify-end rounded-3xl text-white bg-gradient-to-r from-black">
                <h1 className="font-bold text-lg mb-2">{props.name}</h1>
                <h3 className="mb-2">{props.year.slice(0,4)}<span className="font-bold bg-gray-700 ml-10 p-1 rounded-md">{props.rating.toFixed(1)}</span></h3>
                <p className="text-gray-400 w-1/2 text-sm">{props.desc.slice(0,120)}...</p>
                <Link  href={props.link}><button className="bg-red-400 p-3 font-semibold rounded-xl mt-5  w-32" >Watch Trailer</button></Link>

            </div>
            
            
        </div>
    )
}