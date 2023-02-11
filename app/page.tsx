import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
// import 	Helveticaneue 



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
<main>
  <h1 className='bg-black text-cyan-50'>Hello Next js</h1>
</main>
    )
}
