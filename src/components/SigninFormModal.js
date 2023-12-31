

import React, { useState, useContext } from 'react'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, Typography, Box, Button, Modal } from '@mui/material';
import { FormProvider, FTextField } from "./SigninFormComponents";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../auth/AuthProvider';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    border: "1px solid",
    padding: "20px",
    borderRadius: "5px",
    width: "300px"
};

function SigninFormModal() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const defaultValues = {
        username: "lhtruong",
        password: "123456",
    }
    const methods = useForm({ defaultValues })
    const { handleSubmit } = methods;

    const [showPassword, setShowPassword] = useState(false)

    const from = location.state?.from?.pathname || "/";
    const onSubmit = (data) => {
        auth.signin(data.username, data.password, () => {
            navigate(from, { replace: true });
        });
    }
    const handleClose = () => {
        navigate("/");
    };

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={style} gap={4}>
                        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                            Sign in
                        </Typography>
                        <FTextField
                            name="username"
                            label="Username"
                            sx={{ m: "auto" }}
                        />
                        <FTextField
                            name="password"
                            label="Password"
                            sx={{ m: "auto" }}
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{ m: "auto", width: "50%", backgroundColor: "rgb(215, 71, 66)" }}
                        >
                            Sign in
                        </Button>
                    </Box>
                </FormProvider>
            </Modal>
        </div>
    );
}

export default SigninFormModal;