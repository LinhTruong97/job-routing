import React, { useState, useContext } from 'react'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, Typography, Box, Button } from '@mui/material';
import { FormProvider, FTextField } from "./SigninFormComponents";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { AuthContext } from '../auth/AuthProvider';


const style = {
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "300px",
    border: "1px solid",
    padding: "10px",
    borderRadius: "5px",
};

function SigninForm({ callback }) {
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

    return (
        <div>
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

        </div >
    )
}

export default SigninForm
