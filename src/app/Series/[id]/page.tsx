'use client'
import { Provider } from 'react';
import ServerPage from '../serverPage';
import { Suspense } from 'react'
import addFilmStore from '@/app/store/AddFilm';

export default function ClientPage(props: any) {
  // Render the server-side logic directly in the client component
  return (
    <section>
      <Provider store={addFilmStore.savedFilms}>
        <ServerPage {...props}/>
      </Provider>
    </section>
  );
}
