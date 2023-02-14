import { JobPosting } from "./JobPosting"

export interface JobListApiResponse {
	jobs: Array<JobPosting>,
	totalJobs: number,
	remainingJobs: number
}

export interface JobListFilterOptions {
	allowedCompanies?: Array<number>
	sortBy?: string,
	limit?: number
}