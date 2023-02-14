import { Inter } from '@next/font/google';
import styles from './loading.module.scss'

const inter = Inter({ subsets: ['latin'] })

// trying out Next.js new Loading UI convention
// given the time, I'd implement some skeletons
export default function Loading() {
  return <div className={[styles.loading, inter.className].join(' ')}>Loading...</div>
}
