'use client'
import { Loading } from "@/components/loading";
import ServerPage from "./serverPage";
import { Suspense } from 'react'

export default function ClientPage(props: any) {
  return (
    <section>
      <Suspense fallback={<Loading/>}>
        <ServerPage {...props}/>
      </Suspense>
    </section>
  );
}