import React, {useEffect, useState} from 'react';
import style from "./css/AboutPage.module.css";
import {Box, Button, CircularProgress, Container, List, ListItem, PaginationItem, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getComments, getManga} from "../../redux/slices/mangaSlice";
import {ReactComponent as ArrowLeft} from "../../media/mainPage/pagination/ArrowLeft.svg";
import {ReactComponent as ArrowRight} from "../../media/mainPage/pagination/ArrowRight.svg";
import {getGenres} from "../../redux/slices/genreSlice";
import {Pagination_} from "../../components/themes/Themes";
import CommentModal from "../../components/aboutPage/commentModal/CommentModal";
const limit = 3;

const AboutPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const regExp = new RegExp("<p>|&laquo;|&raquo;|</p>|<br />|&mdash;", "g");
    const space = new RegExp("&nbsp;", "g");
    const manga = useSelector(state => state?.manga?.manga);
    const isLoad = useSelector(state => state?.manga?.isLoad);
    const genre = useSelector(state => state?.genre?.genre);
    const comments = useSelector(state => state?.manga?.comments);
    const [offset, setOffset] = useState(1);
    const [genres, setGenres] = useState([{id: 0, title: ""}]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getManga(id));
    }, [dispatch, id]);

    useEffect(() => {
        !isLoad && setGenres(manga?.genre.map(id => genre[id - 1]));
    }, [manga, genre, isLoad]);

    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id, offset]);
    return (
        <Box className={style.aboutPage}>
            <Container>
                <Button
                    className={style.back}
                    color="success"
                    onClick={()=>navigate(-1)}
                ><ArrowLeft/>Назад</Button>
                {
                    !isLoad ?
                        manga?.genre.length > 0 &&
                        <>
                            <Box className={style.information}>
                                <Box component="img" alt="" src={manga?.image}/>
                                <Box className={style.info}>
                                    <Typography component="h1">{manga?.ru_name}</Typography>
                                    <Box className={style.allInfo}>
                                        <Typography component="h2">Информация:</Typography>
                                        <Box><Box component="span">Тип:</Box><Typography>{manga?.type}</Typography></Box>
                                        <Box><Box component="span">Год:</Box><Typography>{manga?.issue_year}</Typography></Box>
                                        <Box><Box component="span">Жанры:</Box><Box component="span">{genres.map((g) => <Typography key={g?.id}>{g?.title+","}</Typography>)}</Box></Box>
                                    </Box>
                                </Box>
                            </Box>
                            <hr/>
                            <Box className={style.sinops}>
                                <Typography component="h1">Синопсис</Typography>
                                <Typography>{manga?.description.replace(regExp, "").replace(space, " ")}</Typography>
                            </Box>
                            <hr/>
                            <Box className={style.bottomBlock}>
                                <Box className={style.addComment}>
                                    <Typography component="h1">Топ комментарий</Typography>
                                    <Button onClick={() => setModal(true)}>Добавить комментарий</Button>
                                    <CommentModal id={id} open={modal} setModal={setModal}/>
                                </Box>
                                <Box className={style.comments}>
                                    <List>
                                        {
                                            comments.length > 0 &&
                                            comments.slice((offset * limit) - limit, (offset * limit)).map(comment => <ListItem key={comment?.id}>
                                                <Box component="img" alt="" src={comment?.user?.image_file}/>
                                                <hr/>
                                                <Box component="span">
                                                    <Typography component="h3">{`${comment?.user?.username}, ${comment?.user?.nickname}`}</Typography>
                                                    <Typography>{comment.text}</Typography>
                                                </Box>
                                            </ListItem>)
                                        }
                                    </List>
                                </Box>
                                {
                                    comments.length > limit
                                    // eslint-disable-next-line react/jsx-pascal-case
                                    && <Pagination_
                                    page={offset}
                                    onChange={(_, page) => setOffset(page)}
                                    count={Math.ceil(comments.length / limit)}
                                    size="large"
                                    color="secondary"
                                    renderItem={(item) => (
                                        <PaginationItem
                                            slots={{previous: ArrowLeft, next: ArrowRight}}
                                            {...item}
                                        />
                                    )}
                                />}
                            </Box>
                        </>
                        : <Box className={style.loading}><CircularProgress/></Box>
                }
            </Container>
        </Box>
    );
};

export default AboutPage;