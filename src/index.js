import React from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: "#423e3e",
            main: "#000"
        }
    }
});
ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            < App />
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
)