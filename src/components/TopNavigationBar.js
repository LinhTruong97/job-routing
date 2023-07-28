import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../auth/AuthProvider';
import MenuIcon from "@mui/icons-material/Menu";


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
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q");

    const [anchorElNav, setAnchorElNav] = useState(null);


    const handlClickSignin = (event) => {
        navigate("/signin");
    };
    const auth = useContext(AuthContext);
    const handlClickSignout = (event) => {
        auth.signout(() => {
            navigate("/");
        });
    };

    const handleInputChange = (event) => {
        const newSearch = event.target.value;
        if (newSearch) {
            setSearchParams({ q: newSearch });
        } else {
            setSearchParams({});
        }
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                            type="text"
                            onChange={handleInputChange}
                            name="q"
                            placeholder="Search"
                            defaultValue={q ?? ""}
                            inputProps={{ "arial-label": "search" }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {auth?.user ? (
                            <>
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
                                style={{ backgroundColor: '#121212' }}
                            >
                                SIGN IN
                            </Button>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {auth?.user ? (
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" }
                                }}
                            >
                                <MenuItem>
                                    <>
                                        <Typography variant="body1" sx={{ m: 2 }}>
                                            Hi {auth.user} !
                                        </Typography>

                                        <MenuItem>
                                            <Button
                                                onClick={handlClickSignout}
                                                variant="contained"
                                                startIcon={<LogoutIcon />}
                                            >
                                                SIGN OUT
                                            </Button>
                                        </MenuItem>
                                    </>
                                </MenuItem>

                            </Menu>) : (
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" }
                                }}
                            >
                                <MenuItem>
                                    <Button
                                        onClick={handlClickSignin}
                                        variant="contained"
                                        startIcon={<LoginIcon />}
                                    >
                                        SIGN IN
                                    </Button>
                                </MenuItem>
                            </Menu>)
                        }

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

