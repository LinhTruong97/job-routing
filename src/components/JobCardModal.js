import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SkillsList from "./SkillsList";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 600 },
    bgcolor: "background.paper",
    borderRadius: 2,
    border: "none",
};

function JobDetailModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const [job, setJob] = useState(null);
    const { id } = useParams();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const fetchJob = async () => {
            const res = await fetch(
                `https://my-json-server.typicode.com/LinhTruong97/jobs-json-server/jobs/${id}`
            );
            const data = await res.json();
            setJob(data);
        };
        fetchJob();
    }, [id]);


    const handleClose = () => {
        navigate(from, { replace: true });
    };

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Card
                        sx={{
                            border: "none",
                            boxShadow: 0,
                            backgroundColor: (theme) => theme.palette.primary.light,
                            color: (theme) => theme.palette.common.white,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {job?.title}
                            </Typography>
                            <SkillsList job={job} />
                            <Typography>{job?.description}</Typography>
                            <Typography variant="h6" component="div">
                                City: {job?.city}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}

export default JobDetailModal;