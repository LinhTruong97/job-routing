import { Container, Grid, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'

import JobCard from '../components/JobCard'
import styled from '@emotion/styled'
import JobList from '../components/JobList'

const jobsPerPage = 5

const CentterPagination = styled(Pagination)(() => ({
    ul: {
        justifyContent: "center",
    },
}));

function HomePage() {

    const [currentJobs, setCurrentJobs] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [pages, setPages] = useState(1);


    useEffect(() => {
        const fetchJobs = async () => {
            const res = await fetch(
                "https://my-json-server.typicode.com/LinhTruong97/jobs-json-server/jobs"
            );
            const jobs = await res.json();
            setTotalPages(Math.ceil(jobs.length / jobsPerPage));
            const currentJobs = jobs.slice((pages - 1) * jobsPerPage, pages * jobsPerPage);
            setCurrentJobs(currentJobs);
        };
        fetchJobs();
    }, [pages]);

    return (
        <Container>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {currentJobs && <JobList jobs={currentJobs} />}
            </Grid>
            <CentterPagination
                sx={{ marginTop: "15px" }}
                count={totalPages}
                onChange={(event, value) => {
                    setPages(value);

                }}
            />
        </Container>
    )
}

export default HomePage
