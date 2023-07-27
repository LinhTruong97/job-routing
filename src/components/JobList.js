import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
    return jobs && jobs.map((job) => <JobCard key={job.id} job={job} />);
};
export default JobList;