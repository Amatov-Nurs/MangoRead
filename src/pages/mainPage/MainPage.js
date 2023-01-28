import React, {useEffect, useState} from 'react';
import {Box, Container, PaginationItem} from "@mui/material";
import {Pagination_} from "../../components/themes/Themes";
import {getMangas} from "../../redux/slices/mangasSlice";
import style from "./css/MainPage.module.css";
import {ReactComponent as ArrowLeft} from '../../media/mainPage/pagination/ArrowLeft.svg';
import {ReactComponent as ArrowRight} from '../../media/mainPage/pagination/ArrowRight.svg';
import MangaList from "../../components/mainPage/mangaList/MangaList";
import {useDispatch, useSelector} from "react-redux";
import MangaFilter from "../../components/mainPage/mangaFilter/MangaFilter";

const MainPage = () => {
    const limit = 12;
    const dispatch = useDispatch();
    const isLoad = useSelector(state => state?.mangas?.isLoad);
    const mangas = useSelector(state => state?.mangas?.mangas);
    const type = useSelector(state => state?.mangas?.params?.type);
    const genre = useSelector(state => state?.mangas?.params?.genre);
    const [offset, setOffset] = useState(0);
    const [Genre, setGenre] = useState({});
    const [Type, setType] = useState({});

    const changeTypeOrBtn = (p = 0) => {
        setOffset(p);
        setType(type);
        setGenre(genre);
    };

    useEffect(() => {
        dispatch(getMangas({
            limit: limit,
            offset: offset,
            ...Type,
            ...Genre
        }));
    }, [dispatch, offset, limit, Type, Genre]);
    return (
        <Box className={style.mainPage}>
            <Container>
                <MangaFilter changeTypeOrBtn={changeTypeOrBtn}/>
                <MangaList/>
            </Container>
            {
                mangas?.count >= 12 &&
                !isLoad
                // eslint-disable-next-line react/jsx-pascal-case
                && <Pagination_
                        page={(offset / limit) + 1}
                        onChange={(_, page)=>setOffset((page - 1) * limit)}
                        count={Math.ceil(mangas?.count / limit)}
                        size="large"
                        color="secondary"
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowLeft, next: ArrowRight }}
                                {...item}
                            />
                        )}
                    />
            }
        </Box>
    );
};

export default MainPage;