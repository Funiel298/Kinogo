'use client'
import ServerPage from '../serverPage';
import { Suspense } from 'react'

export default function ClientPage(props: any) {
  // Render the server-side logic directly in the client component
  return (
    <section>
      <Suspense fallback={<p>Loading page</p>}>
        <ServerPage {...props}/>
      </Suspense>
    </section>
  );
}
