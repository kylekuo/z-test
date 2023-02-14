// a simple interface for the job postings;
// I didn't include everything, just what
// I planned on using

export interface JobPosting {
	jobId: string,
	jobTitle: string,
  jobDescription: string,
	jobLevels: Array<string>,
  companyID: number,
  companyName: string,
  companyLogo: string,
  companyInitial: string,
  skillsets: Array<string>,
	location: string,
	postingDate: string,
	postedDate: string,
	unifiedZippiaSalary: number
}
