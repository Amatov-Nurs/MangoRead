import React, {useEffect, useState} from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import style from "./css/CommentModal.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Search} from "../../themes/Themes";
import {addComment, getComments} from "../../../redux/slices/mangaSlice";

const CommentModal = ({id, open, setModal}) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state?.auth?.user?.username);
    const image = useSelector(state => state?.auth?.user?.image);
    const access = useSelector(state => state?.auth?.user?.access);
    const [close, setClose_] = useState(open);
    const [move, setMove] = useState("-100vh");
    const [comment, setComment] = useState("");
    const user = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : false;

    const handleClick = (e) => {
        e.preventDefault();
        setModal(false);
        user
            ? dispatch(addComment({id: id, text: comment, access: access}))
            : alert("Вы не зарегистрированы!");
        dispatch(getComments(id));
    };

    useEffect(() => {
        if (open) {
            setClose_(true);
            setMove("-100vh");
            setTimeout(() => setMove("50%"), 10);
        } else {
            setMove("50%");
            setTimeout(() => setMove("-100vh"), 10);
            setTimeout(() => setClose_(false), 225);
        }
    }, [open]);
    return (
        <Modal open={close} onClose={() => setModal(false)}>
            <Box className={style.modal} sx={{top: move}}>
                <Box className={style.user}>
                    <Box component="img" alt="" src={image}/>
                    <Typography component="h3">{username}</Typography>
                </Box>
                <Box className={style.comment} component="form" type="submit" onSubmit={handleClick}>
                    <Search placeholder="Добавьте комментарий" onChange={({target}) => setComment(target.value)}/>
                    <Button variant="contained" onClick={handleClick}>Добавить</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CommentModal;