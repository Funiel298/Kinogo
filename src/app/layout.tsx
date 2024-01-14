import './globals.css'
import Nav from '@/app/nav';
import { Inter } from "next/font/google";

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
                <Nav>    
                    {children}
                </Nav>
            </body>
        </html>
    )
}