import { JobPosting } from "@/types/JobPosting";
import './JobCard.scss';

export default function JobCard({ job }: { job: JobPosting }) {

  return <article className='job-card'>

    <header>

      <div className="image-col">
        <div className="image-wrap">
          <div className="image-placeholder">{job.companyInitial}</div>
          {(job.companyLogo) ? ( 
            <img 
              src={job.companyLogo} 
              alt={`Logo for ${job.companyName}`} 
            /> ) : null}
        </div>
      </div>

      <div className="info-col">
        <h1 className='title'>{job.jobTitle}</h1>
        <h2 className='company'>{job.companyName}</h2>
      </div>

    </header>
    
    <div className="additional-info">
      {job.postedDate && ( <span className="date">{job.postedDate}</span> )}
      {job.location && ( <span className="location">{job.location}</span> )}
      {job.jobLevels && ( 
        <span className="level-list">{job.jobLevels.map(level => (
          <span key={level} className="level">{level}</span>
        ))}</span> 
      )}
      {job.unifiedZippiaSalary && ( 
        <span className="salary">{
          new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD', 
            currencyDisplay: 'narrowSymbol',
            notation: 'compact'
          }).format(job.unifiedZippiaSalary)
        }</span> 
      )}
    </div>

    <div className='description' dangerouslySetInnerHTML={{__html: job.jobDescription}} />    

    <a href="#" className="item-link">See position</a>  

  </article>;
}
