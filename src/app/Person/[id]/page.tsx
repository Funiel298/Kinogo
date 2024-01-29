'use client'
import { Provider } from 'react';
import ServerPage from './serverPage';
import { Suspense } from 'react'
import addFilmStore from '@/app/store/AddFilm';
import { Loading } from '@/components/Loading';

export default function ClientPage(props: any) {
  return (
    <section>
      <Suspense fallback={<Loading/>}>
        <ServerPage {...props}/>
      </Suspense>
    </section>
  );
}
