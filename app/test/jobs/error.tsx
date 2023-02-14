'use client';

import { Inter } from '@next/font/google';
import { useEffect } from 'react';
import styles from './error.module.scss'

const inter = Inter({ subsets: ['latin'] })

// trying out Next.js new Error Handling convention
export default function Error({ error, reset } : { error: Error, reset: () => void }) {

	useEffect(() => console.error(error), [error]);

  return <div className={[styles.error, inter.className].join(' ')}>
		<h2>Something went wrong!</h2>
		<button onClick={() => reset()}>Try again</button>
	</div>
}
