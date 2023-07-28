import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SkillsList from "./SkillsList";
import { LoadingButton } from "@mui/lab";

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
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                const res = await fetch(
                    `https://my-json-server.typicode.com/LinhTruong97/jobs-json-server/jobs/${id}`
                );
                const data = await res.json();
                setJob(data);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
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
                            color: (theme) => theme.palette.common.white
                        }}
                    >
                        {loading ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                minHeight="50px"
                            >
                                <LoadingButton loading variant="text" />
                            </Box>
                        ) : (
                            <CardContent sx={{ textAlign: "center" }} >
                                <Typography variant="h5" component="div">
                                    {job?.title}
                                </Typography>
                                <SkillsList skills={job?.skills} />
                                <Typography>{job?.description} </Typography>
                                <Typography variant="subtitle" component="div" sx={{ mt: 1 }}>
                                    City: {job?.city}
                                </Typography>
                            </CardContent>)}
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}

export default JobDetailModal;