import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import SigninFormModal from "../components/SiginFormModal.js";

function SiginPage() {
    let navigate = useNavigate();
    let from = navigate.state?.from?.pathname || "/";

    return (
        <Stack sx={{ p: 4, alignItems: "center" }}>
            <SigninFormModal
                callback={() => {
                    navigate(from, { replace: true });
                }}
            />
        </Stack>
    );
}

export default SiginPage;