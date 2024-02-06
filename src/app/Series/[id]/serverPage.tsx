import GetData from '@/components/ServerGetData';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { use, useState } from 'react';
import Slider from '@/components/Slider';
import { FaPlay } from 'react-icons/fa';
import Modal from '@/components/Modal';
import { RiFlag2Line } from 'react-icons/ri';
import { LuStar } from 'react-icons/lu';
import { GiRoundStar } from 'react-icons/gi';
import { observer } from 'mobx-react-lite';
import addFilmStore from '@/app/store/AddFilm';
import InfoSection from '@/components/FilmComponent/Content';
const API_IMG = "https://image.tmdb.org/t/p/w500/"

const breakpoints = {
    640: {
        slidesPerView: 1,
        spaceBetween: 10,
    },
    760: {
        slidesPerView: 1.25,
        spaceBetween: 40,
    },
    1024: {
        slidesPerView: 1.5,
        spaceBetween: 50,
    },
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

const ServerPage = ({ params: { id } }: { params: Params }) => {
    const similar = use(GetData(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
    const post = use(GetData(`https://api.themoviedb.org/3/tv/${id}?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
    const trailers = use(GetData(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));
    const casting = use(GetData(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=f2e3189ddbb0312728c6ef6a85f9dede`));

    return (
        <div className="bg-gray-900 w-full overflow-hidden">
            <div className="flex flex-row ">
                <img className="w-full h-[30vh]  md:h-96 object-cover object-top" src={API_IMG + post.backdrop_path} alt="" />
                <div className="text-white r-0  absolute flex justify-end  h-[30vh] md:h-96 w-full bg-gradient-to-b from-transparent from-10% to-gray-900 to-100%" />
            </div>

            <div className="text-white w-full flex z-0 flex-col items-center justify-center">
                <InfoSection post={post} length={['Episodes' , post.number_of_episodes]} release={`${post.first_air_date?.slice(8, 10)} ${months[Number(post.first_air_date?.slice(5, 7)) - 1]}`} trailers={trailers} />

                <div className="w-11/12 my-5 z-0 flex justify-center items-center flex-col">
                    <Slider movies={casting.cast} tag={'Actors'} type={`Person`} />
                    <Slider movies={similar.results} tag={'Similar'} type={'filmPage'} />
                </div>
            </div>
        </div>
    )
}

export default observer(ServerPage)
