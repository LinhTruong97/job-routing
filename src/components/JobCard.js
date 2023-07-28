import React from 'react';
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SkillsList from './SkillsList';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { styled } from "@mui/material/styles";

const CardStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    border: "1px solid black",
    width: "100%",
    maxWidth: "350px",
    minWidth: "270px",
    height: "270px",
    margin: "auto",
    paddinBottom: "5px",
    backgroundColor: theme.palette.primary.light,
}));

export default function JobCard({ job }) {
    return (
        <CardStyle variant="outlined" >
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
                padding="5px"
            >
                <CardContent>
                    <Typography
                        variant="subtitle1"
                        sx={{ textAlign: "center" }}
                    >
                        {job.title}
                    </Typography>
                    <Divider />
                    <SkillsList skills={job.skills} />
                    <Typography variant="body2">
                        {job.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        sx={{ width: "130px", backgroundColor: "#F88379" }}
                        component={Link}
                        to={`/jobs/${job.id}`}
                    >
                        Learn More
                    </Button>
                </CardActions>
            </Stack>
        </ CardStyle >
    );
}