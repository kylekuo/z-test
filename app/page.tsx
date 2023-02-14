import { Inter } from '@next/font/google'
import Link from 'next/link'
import styles from './page.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={[styles.main, inter.className].join(' ')}>
      <p>Home Page</p>
      <Link href={`/test/jobs`}>Go to test</Link>
    </main>
  )
}
