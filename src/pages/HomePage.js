
import React, { useEffect, useState } from 'react'
import { Outlet, useSearchParams } from "react-router-dom"

import { Container, Grid, Pagination } from '@mui/material'
import styled from '@emotion/styled'
import JobList from '../components/JobList'

const jobsPerPage = 6;
const BASE_URL = "https://my-json-server.typicode.com/LinhTruong97/jobs-json-server/jobs"

const CentterPagination = styled(Pagination)(() => ({
    ul: {
        justifyContent: "center",
    },
}));

function HomePage() {
    const [jobs, setJobs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentJobs, setCurrentJobs] = useState([]);
    const [pages, setPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q");

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await fetch(BASE_URL);
            const jobsData = await res.json();
            setJobs(jobsData);
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const applyFilter = () => {
            if (q) {
                const lowerCaseQ = q.toLowerCase();
                const searchedJobs = jobs.filter((job) =>
                    job.title.toLowerCase().includes(lowerCaseQ) ||
                    job.skills.some((skill) => skill.includes(lowerCaseQ)) ||
                    job.description.toLowerCase().includes(lowerCaseQ)
                );
                setTotalPages(Math.ceil(searchedJobs.length / jobsPerPage));
                setCurrentJobs(searchedJobs.slice((pages - 1) * jobsPerPage, pages * jobsPerPage));
            } else {
                setTotalPages(Math.ceil(jobs.length / jobsPerPage));
                setCurrentJobs(jobs.slice((pages - 1) * jobsPerPage, pages * jobsPerPage));
            }
        };
        applyFilter();
    }, [pages, q, jobs]);

    return (
        <>
            <Container>
                <Grid container spacing={4} sx={{ mt: 2, gap: 3 }}>
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
            <Outlet />
        </>
    )
}

export default HomePage
