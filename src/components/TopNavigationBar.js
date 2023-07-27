import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../auth/AuthProvider';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function TopNavigationBar() {

    const navigate = useNavigate();

    const handlClickSignin = (event) => {
        navigate("/signin");
    };

    const auth = useContext(AuthContext);

    const handlClickSignout = (event) => {
        auth.signout(() => {
            navigate("/");
        });
    };


    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Job Routing
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    {auth?.user ? (
                        <>
                            <Avatar
                                src="/images/avatar/1.jpg"
                                sx={{ width: 40, height: 40, m: 1 }}
                            />
                            <Typography variant="body1" sx={{ m: 2 }}>
                                Hi {auth.user} !
                            </Typography>
                            <Button
                                onClick={handlClickSignout}
                                variant="contained"
                                startIcon={<LogoutIcon />}
                            >
                                SIGN OUT
                            </Button>

                        </>
                    ) : (
                        <Button
                            onClick={handlClickSignin}
                            variant="contained"
                            startIcon={<LoginIcon />}
                        >
                            SIGN IN
                        </Button>
                    )}


                </Toolbar>
            </AppBar>
        </Box>
    );
}

