

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
    borderRadius: 2,
    boxShadow: 24,
    border: "none",
};

function SigninFormModal() {
    const auth = useContext(AuthContext);
    const { signin } = useContext(AuthContext);
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
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={style} gap={4}>
                        <Typography variant="h4" component="div">
                            Sign in
                        </Typography>
                        <FTextField
                            name="username"
                            label="Username"
                        />
                        <FTextField
                            name="password"
                            label="Password"
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
                            sx={{ m: 1, width: "10ch", backgroundColor: "rgb(215, 71, 66)" }}
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