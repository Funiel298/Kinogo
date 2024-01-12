'use client'
import ServerPage from "../importer";


export default function ClientPage(props: any) {
  // Render the server-side logic directly in the client component
  return <ServerPage {...props} />;
}
