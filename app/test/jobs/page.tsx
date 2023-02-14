import { Inter } from '@next/font/google'
import { JobListApiResponse } from '@/types/JobListing'
import { getJobs } from './lib/getJobs'
import JobList from '@/components/JobList'
import styles from './page.module.scss'

// trying out Next.js 13 optimized fonts;
const inter = Inter({ subsets: ['latin'] });

// trying out Next.js 13 new Server Components;
export default async function Page() {

	const data = await getJobs() as JobListApiResponse;

  return (
    <main className={[styles.main, inter.className].join(' ')}>
			<JobList jobs={data.jobs} total={data.totalJobs} />
    </main>
  )

}
