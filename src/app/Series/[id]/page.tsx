'use client'
import { Provider } from 'react';
import ServerPage from './serverPage';
import { Suspense } from 'react'
import addFilmStore from '@/app/store/AddFilm';
import { Loading } from '@/components/loading';

export default function ClientPage(props: any) {
  // Render the server-side logic directly in the client component
  return (
    <section>
      <Suspense fallback={<Loading/>}>
        <ServerPage {...props}/>
      </Suspense>
    </section>
  );
}
