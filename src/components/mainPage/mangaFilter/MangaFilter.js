import React, {useEffect, useState} from 'react';
import {getGenres} from "../../../redux/slices/genreSlice";
import {Box, Button, Typography} from "@mui/material";
import {getMangasByGenre, getMangasByType} from "../../../redux/slices/mangasSlice";
import style from './css/MangaFilter.module.css';
import button from '../../header/css/Header.module.css';
import {ReactComponent as ArrowRight} from "../../../media/mainPage/mangaFilter/ArrowRight.svg";
import {ReactComponent as ArrowLeft} from "../../../media/mainPage/mangaFilter/ArrowLeft.svg";
import Type from "./Type";
import Genre from "./Genre";
import {useDispatch, useSelector} from "react-redux";

const MangaFilter = ({ changeTypeOrBtn }) => {
    const dispatch = useDispatch();
    const apply = useSelector(state => state?.auth?.apply);
    const [type, setType] = useState("");
    const [genre, setGenre] = useState("");
    const [words, setWords] = useState(["Сбросить", "Применить"]);
    const [types, setTypes] = useState(true);
    const [valid, setValid] = useState([false, false]);
    const [typeOrGenre, setTypeOrGenre] = useState(true);

    const handleClear = () => {
        if (valid[0] || valid[1]) {
            dispatch(getMangasByType({}));
            setType("");
            dispatch(getMangasByGenre({}));
            setGenre("");
        } else {
            setWords(["Регистрация", "Применить"]);
            setTimeout(() => setWords(["Сбросить", "Применить"]), 500);
        }
    };

    const handleApply = () => {
        if (valid[0] || valid[1]) {
            changeTypeOrBtn()
        } else {
            setWords(["Сбросить", "Регистрация"]);
            setTimeout(() => setWords(["Сбросить", "Применить"]), 500);
        }
    };

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    useEffect(() => {
        if (type !== "" || genre !== "") {
            setTypeOrGenre(false)
        } else setTypeOrGenre(true);
    }, [type, genre, typeOrGenre]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setValid([apply, user !== null ? JSON.parse(user) : false]);
    }, [apply]);
    return (
        <Box className={style.filter}>
            <Box className={`${style.topBtn} ${types && style.mT}`}>
                {types && <Typography component="span">Жанры</Typography>}
                <Button
                    className={`${style.typesOrGenre} ${!types && style.flexStart}`}
                    color='success'
                    onClick={() => setTypes(!types)}>
                    {
                        types
                            ? <>Все <ArrowRight style={{marginLeft: 17}}/></>
                            : <><ArrowLeft style={{marginRight: 10}}/>Назад</>
                    }
                </Button>
            </Box>
            {
                types
                    ? <Type type={type} setType={setType}/>
                    : <Genre genre={genre} setGenre={setGenre}/>
            }
            <Box className={`${button.sign} ${style.bottomBtn}`}>
                <Button disabled={typeOrGenre} variant="contained" onClick={handleClear}>{words[0]}</Button>
                <Button variant="contained" onClick={handleApply}>{words[1]}</Button>
            </Box>
        </Box>
    );
};

export default MangaFilter;