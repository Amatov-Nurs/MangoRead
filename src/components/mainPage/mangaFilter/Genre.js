import React from 'react';
import {Box, List, ListItem, Typography, FormControlLabel, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import style from './css/Genre.module.css';
import forGenre from './css/MangaFilter.module.css';
import {getMangasByGenre} from "../../../redux/slices/mangasSlice";
import {ReactComponent as CheckIcon} from "../../../media/mainPage/mangaFilter/checkIcon.svg";
import {ReactComponent as CheckedIcon} from "../../../media/mainPage/mangaFilter/checkedIcon.svg";

const Genre = ({genre, setGenre}) => {
    const dispatch = useDispatch();
    const genres = useSelector(state => state?.genre?.genre);

    const handleClick = ({target}, g) => {
        target.checked ? setGenre(g) : setGenre('');
        dispatch(getMangasByGenre(target.checked ? {genre__title: g} : {}));
    };

    return (
        <Box className={style.genre}>
            <Typography component="h2">Жанры</Typography>
            <List className={forGenre.list}>
                {
                    genres.length > 0
                        && genres.map((g) => <ListItem key={g.id}>
                        <FormControlLabel label={g?.title} sx={{'& .MuiButtonBase-root:active': {background: "none !important"}}} control={
                            <Checkbox
                                checked={g?.title === genre}
                                onChange={(e) => handleClick(e, g?.title)}
                                color="secondary"
                                icon={<CheckIcon/>}
                                checkedIcon={<CheckedIcon/>}
                            ></Checkbox>
                        }/>
                    </ListItem>)
                }
            </List>
        </Box>
    );
};

export default Genre;