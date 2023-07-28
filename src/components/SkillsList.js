import React from "react";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const ListItem = styled("li")(() => ({
    margin: "1px",
}));


const Skills = styled("ul")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",

    backgroundColor: (theme) => theme.palette.primary.light,
}));


function SkillsList({ skills }) {
    return (
        <Skills
            sx={{
                boxShadow: 0,
                p: 0.5,
                m: 0,
            }}
        >
            {skills?.slice(0, 4).map((skill) => (
                <ListItem key={skill}>
                    <Chip
                        size="small"
                        color="primary"
                        label={skill}
                        sx={{ paddingBottom: "2px", backgroundColor: "#9B524C" }}
                    />
                </ListItem>
            ))}
        </Skills>
    );
}

export default SkillsList;