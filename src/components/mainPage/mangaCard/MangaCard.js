import React from 'react';
import  style from "./css/MangaCard.module.css";
import {Box, ListItemText, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const MangaCard = ({manga}) => {
    return (
        <NavLink to={`/${manga?.id}`} className={style.link}>
            <Box className={style.shadow} sx={{backgroundImage: `url("${manga.image}")`}}>
                <Box className={style.card}>
                    <ListItemText className={style.text}>
                        <Typography component='span'>Год: {manga?.issue_year}</Typography>
                        <Typography>{manga.ru_name}</Typography>
                    </ListItemText>
                </Box>
            </Box>
        </NavLink>
    );
};

export default MangaCard;