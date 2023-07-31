import { AiFillStar, AiOutlineClockCircle } from 'react-icons/ai'
import { GrFavorite } from 'react-icons/gr'
export default function Card(props: any){
    
    //hover:opacity-100 duration-500


    const API_IMG = "https://image.tmdb.org/t/p/w500/"

    return(
        <div className="  h-72 mb-10  flex flex-col">
            
            <img src={API_IMG + props.image} alt="film_image"
                className='
                h-64 
                object-cover
                 rounded-3xl
                  cursor-pointer
                   hover:opacity-60
                    duration-500   ' />
            
            <div className='
                select-none
                text-white
                flex  
                mt-2
                justify-between
                items-center'>
                
                
                {props.name?.length<20 ? 
                    <h3 className='font-bold text-white text-sm'>
                        {props.name}
                        </h3>
                        :
                    <h3 className='font-bold text-white text-sm'>
                        {props.name?.slice(0,20)+'...'}
                        </h3> }


                <div className='flex flex-row  '>
                    <AiFillStar className='mt-1'/>{<p>{props.rating}</p>}
                </div>
            </div>
            
            
        </div>
    )
}