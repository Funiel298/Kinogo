export default function Card(props: any){
    
    //hover:opacity-100 duration-500


    

    return(
        <div className="relative h-[50vw] w-auto object-cover bg-no-repeat rounded-2xl overflow-hidden" style={{backgroundImage: `url(${props.image})`,}}>
            <h1 className="absolute p-10 font-semibold text-sm text-white z-10"><span className="p-3 bg-gray-500 rounded-xl">Playing Now</span></h1>
            {/* <img src={props.image} alt="film_image" className='rounded-3xl object-cover rounded-5xl cursor-pointer opacity-60' /> */}

            <div className=" h-full w-full flex flex-col items-start justify-center p-10 rounded-3xl text-white">
                <h1 className="font-bold text-lg mb-2 md:text-sm">{props.name}</h1>
                <h3 className="mb-2">{props.year.slice(0, 4)}<span className="font-bold bg-gray-700 ml-10 p-1 rounded-md md:text-sm">{props.rating.toFixed(1)}</span></h3>
                <p className="text-gray-400 w-1/2 text-[10px]">{props.desc.slice(0, 120)}...</p>
                <a href={props.link}><button className="bg-red-400 p-3 font-semibold rounded-xl mt-5 w-auto md:text-xl md:font-medium">Watch Trailer</button></a>
            </div>
        </div>

    )
}