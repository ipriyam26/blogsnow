import './globals.css'
import { Inter } from '@next/font/google'
import Header from './Header'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='overflow-x-hidden'>

        <Header></Header>
        <div>
          {children}

        </div>
 
      

      </body>

    </html>
  )
}
