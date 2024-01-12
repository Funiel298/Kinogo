import Link from "next/link"
export default function Card(props: any){
    


    

    return(
        <Link href={props.link} className=" h-full  rounded-3xl mr-5  flex flex-col  ">
            <img src={props.image} alt="film_image"
                className='
                rounded-3xl
                object-cover
                 rounded-5xl
                  cursor-pointer
                   opacity-80
                       ' />

            <div className="absolute h-full flex flex-col text-3xl p-10 justify-end rounded-3xl text-white bg-gradient-to-r from-black">
                <h1 className="font-bold text-2xl mb-2 md:text-sm">{props.name}</h1>
                <div className="flex flex-row text-sm items-center  w-full">
                    <h3 className="font-medium">{props.year?.slice(0,4)}</h3>
                    <span className=" font-bold ml-10 bg-gray-800 p-2 rounded-xl bg-opacity-70">{props.rating.toFixed(1)}</span>
                  
                </div>
                
            </div>
        </Link>
    )
}