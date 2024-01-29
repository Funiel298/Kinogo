import './globals.css'
import Nav from '@/app/nav';
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SkeletonTheme } from 'react-loading-skeleton';
const inter = Inter({ subsets: ['latin']})

export const metadata = {
    title: 'Kinogo',
    description: 'generated '
}

export default function RootLayout({
    children,
    
}: {
    children: React.ReactNode
})
{
    return(
        <html>
            <body className={inter.className}>
                <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
                    <Nav>    
                        {children}
                    </Nav>
                </SkeletonTheme>
                
            </body>
        </html>
    )
}