import React from 'react';
import {Box, FormControlLabel, List, ListItem, Typography, Checkbox} from "@mui/material";
import {DateTextField} from "../../themes/Themes";
import {getMangasByType} from "../../../redux/slices/mangasSlice";
import style from "./css/Type.module.css";
import forType from './css/MangaFilter.module.css';
import {ReactComponent as CheckIcon} from "../../../media/mainPage/mangaFilter/checkIcon.svg";
import {ReactComponent as CheckedIcon} from "../../../media/mainPage/mangaFilter/checkedIcon.svg";
import {useDispatch} from "react-redux";

const Type = ({type, setType}) => {
    const date = new Date();
    const dispatch = useDispatch();
    const Types = ["Манга", "Манхва", "Западный комикс", "Маньхуа"];

    const handleClick = ({target}, t) => {
        target.checked ? setType(t) : setType('');
        dispatch(getMangasByType(target.checked ? {type: t} : {}));
    };

    return (
        <Box className={style.type}>
            <Typography component="h2">Типы</Typography>
            <List className={forType.list}>
                {
                    Types.map((t, k) =>
                        <ListItem key={k}>
                        <FormControlLabel label={t} sx={{'& .MuiButtonBase-root:active': {background: "none !important"}}} control={
                            <Checkbox
                                checked={t === type}
                                onChange={(e) => handleClick(e, t)}
                                color="secondary"
                                icon={<CheckIcon/>}
                                checkedIcon={<CheckedIcon/>}
                            ></Checkbox>
                        }/>
                    </ListItem>)
                }
            </List>
            <Box className={style.date}>
                <DateTextField placeholder="От 0" color="secondary" type="number"/>
                <hr/>
                <DateTextField placeholder={"До "+date.getFullYear()} color="secondary" type="number"/>
            </Box>
        </Box>
    );
};

export default Type;