import Link from "next/link"
export default function Card(props: any){
    
    //hover:opacity-100 duration-500


    

    return(
        <div className=" h-screen mb-10 p-20  flex flex-col -mt-10">
            <h1 className="absolute pt-10 pl-20 font-semibold text-3xl text-white z-10">Playing Now</h1>
            <img src={props.image} alt="film_image"
                className='
                object-cover
                 rounded-5xl
                  cursor-pointer
                   opacity-60   ' />

            <div className="absolute h-full w-full flex flex-col justify-end p-20 text-white bg-gradient-to-r from-black">
                <h1 className="font-bold text-4xl w-1/3">{props.name}</h1>
                <h3 className="mt-4 mb-4">2022 <span className="font-bold bg-gray-700 ml-10 p-1 rounded-md">7,2</span></h3>
                <p className="text-gray-400 w-1/3">{props.desc}</p>
                <Link  href={props.link}><button className="bg-red-400 p-5 font-semibold rounded-xl mt-5  w-44" >Watch Trailer</button></Link>

            </div>
            
            
        </div>
    )
}