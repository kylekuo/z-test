'use client';

import { JobListFilterOptions } from '@/types/JobListing';
import { JobPosting } from '@/types/JobPosting';
import { useMemo, useState } from 'react';
import JobCard from './JobCard';
import './JobList.scss';

export default function JobList({
	jobs,
	total
}: {
	jobs: Array<any>,
	total: number
}) {

	// initializing reactive properties;
	// for production code, with better understanding of the API and better 
	// communication with backend folks, I'd probably split 'filterOptions'
	// into more variables and allow for more granular control over the filters
	const [list, setList] = useState([...jobs]);
	const [filterOptions, setFilterOptions] = useState<JobListFilterOptions>({ limit: 10 });

	// creates a map of included companies in the query response;
	// would probably be better off as a separate query asking for
	// every company listed in the db, then updating job list query
	// for the selected companies if needed, but that's outside of 
	// the test's scope
	const setCompanyList = (list: Array<JobPosting>) => {
		const cl: any = {};

		for (const jobItem of list) {
			if (cl[jobItem.companyID] || [null, undefined].includes( jobItem.companyID as any ) ) continue;
			cl[jobItem.companyID] = {
				id: jobItem.companyID,
				name: jobItem.companyName,
				active: (filterOptions.allowedCompanies) ? filterOptions.allowedCompanies.includes(jobItem.companyID) : false
			}
		}

		return cl;
	}
	const companyList = useMemo(() => setCompanyList(list), [list, filterOptions]),
				companyListEntries = useMemo(() => Object.entries(companyList), [companyList]);

	// a 'single' pass to mutate the query response;
	// would probably be more data accurate to build a query
	// off of the applied filters if any, but that's outside
	// the test's scope  
	const filterList = (list: Array<JobPosting>, options: JobListFilterOptions): Array<JobPosting> => {
		let listCopy = [...list];

		// handles a change in the selected companies allowed in
		// the results; this is a simple filter and not really
		// scalable, but a more generalized solution would require
		// better understanding of the db, schema and query and also
		// more direct communication with backend folks 
		if (options.allowedCompanies) {
			listCopy = listCopy.filter(item => options.allowedCompanies?.includes(item.companyID));
		}

		// handles a change in the selected sorting for the results;
		// a bit overkill, as there's only one option so far, but 
		// this solution is somewhat scalable
		if (options.sortBy) switch (options.sortBy) {
			case 'recent':
				listCopy.sort((a, b) => {
					const ad = new Date(a.postingDate ?? 0),
								bd = new Date(b.postingDate ?? 0);
					return (bd.getTime() - ad.getTime());
				});
				break;
		}

		// handles limiting of results to wanted quantity;
		// simple solution appropriate for the test, however without much room 
		// to scale, as new features like pagination would require more results 
		// in query and therefore slower loading times 
		if (options.limit && options.limit > 0) {
			listCopy = listCopy.slice(0, options.limit);
		}

		return listCopy
	}

	const visibleList = useMemo(() => filterList(list, filterOptions), [filterOptions]);

	const handleSort = (value: string) => {
		const isSet = (filterOptions.sortBy && filterOptions.sortBy === value);

		if (!isSet) return setFilterOptions({...filterOptions, sortBy: value});

		const optionsCopy = {...filterOptions};
		delete optionsCopy.sortBy;
		return setFilterOptions(optionsCopy);
	};

	const handleFilter = (id: number) => {
		let optionsCopy = {...filterOptions},
				filterCopy = (optionsCopy.allowedCompanies) ? [...optionsCopy.allowedCompanies] : [];

		if (!filterCopy.includes(id)) {
			filterCopy.push(id);
		} else {
			const idIndex = filterCopy.indexOf(id);
			filterCopy.splice(idIndex, 1);
		}

		optionsCopy.allowedCompanies = filterCopy;
		
		if (filterCopy.length === 0) delete optionsCopy.allowedCompanies;
		return setFilterOptions(optionsCopy);
	};

  return (
		<div className='job-list'>
			<h1>Job List</h1>
			<div className='controls'>
				
				<div className='sort'>

					<label>Sort jobs</label>

					<button 
						id="sort-recent" 
						className={( filterOptions.sortBy === 'recent' ) ? 'selected' :  undefined} 
						onClick={() => handleSort('recent')}
						>See the latest openings</button>

				</div>
				
				<div className={`companies ${(filterOptions.allowedCompanies) ? 'has-selected' : ''}`}>
					
					<label>Companies</label>

					{companyListEntries.map(([id, company]: Array<any>) => (
						<button 
							key={id}
							className={( filterOptions.allowedCompanies?.includes(company.id) ) ? 'selected' :  undefined} 
							onClick={() => handleFilter(company.id)}
							>{company.name}</button>
					))}					

				</div>

			</div>

			<div className='row-info'>
				<span className='total'>{`${total} jobs available`}</span>
			</div>

			<div className='row'>
				{visibleList.map((job: JobPosting) => (
					<JobCard key={job.jobId} job={job} />
				))}
			</div>

    </div>
  );
}
