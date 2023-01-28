import React from 'react';
import { Box, CircularProgress, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import MangaCard from "../mangaCard/MangaCard";
import style from "./css/MangaList.module.css";

const MangaList = () => {
    const isLoad = useSelector(state => state?.mangas?.isLoad);
    const mangas = useSelector(state => state?.mangas?.mangas);

    return (
        <Box className={style.list}>
            {
                isLoad
                    ? <Box className={style.isLoad}><CircularProgress/></Box>
                    : <List>
                        {
                            mangas?.results.map(manga =>
                                <ListItem key={manga?.id}>
                                <MangaCard manga={manga}/>
                            </ListItem>)
                        }
                    </List>
            }
        </Box>
    );
};

export default MangaList;