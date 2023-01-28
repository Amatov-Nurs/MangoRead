import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Modal} from "@mui/material";
import {Search} from "../themes/Themes";
import {signIn, signUp} from "../../redux/slices/authSlice";
import style from "./css/SignModal.module.css";
import {ReactComponent as Close} from "../../media/mainPage/header/x.svg";
import {ReactComponent as CheckIcon} from "../../media/mainPage/header/checkIcon.svg";
import {ReactComponent as CheckedIcon} from "../../media/mainPage/header/checkedIcon.svg";
import {useDispatch} from "react-redux";

const SignModal = ({open, setModal, log, setLog}) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState("https://assets8.lottiefiles.com/avatars/default_user.jpg");
    const fileClick = useRef(null);
    const [close, setClose] = useState(open);
    const [move, setMove] = useState("-100vh");
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        fileClick.current.click();
    };

    const registration = () => {
        const data = {
            "username": username,
            "nickname": nickname,
            "password": password,
            "image_file": file
        }
        dispatch(signUp(data));
        setModal(false);
        setImage(null);
        setUsername("");
        setNickname("");
        setPassword("");
    };

    const login = () => {
        const data = {
            username: username,
            password: password,
            apply: checked
        };
        dispatch(signIn(data));
        setModal(false);
        setUsername("");
        setPassword("");
    };

    useEffect(() => {
        if (open) {
            setClose(true);
            setMove("-100vh");
            setTimeout(() => setMove("50%"), 10);
        } else {
            setMove("50%");
            setTimeout(() => setMove("-100vh"), 10);
            setTimeout(() => setClose(false), 225);
        }
    }, [open]);

    useEffect(() => {
        const reader = new FileReader();
        file !== null
            && reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    }, [file]);
    return (
        <Modal open={close} onClose={() => setModal(false)}>
            <Box className={style.auth} sx={{top: move,}}>
                <Box className={style.close}><Close onClick={() => setModal(false)}/></Box>
                <Box className={style.choice}>
                    <Box className={style.buttons}>
                        <Box component="span" onClick={()=>setLog(true)}>Войти</Box>
                        <Box component="span" onClick={()=>setLog(false)}>Регистрация</Box>
                        <i style={log ? {width: 80} : {width: 167, left: 107}}></i>
                    </Box>
                </Box>
                {
                    !log ?
                    <FormGroup className={style.form}>
                        <Box component="img" alt="" src={image}/>
                        <Button onClick={handleClick} className={style.addFile}>Добавить фото</Button>
                        <input ref={fileClick} hidden onChange={({target}) => setFile(target.files[0])} type="file" accept="image/*,.png,.gpg,.gif,.web,"/>
                        <Search onChange={({target}) => setUsername(target.value)} className="customInput" placeholder="Username" value={username}/>
                        <Search onChange={({target}) => setNickname(target.value)} className="customInput" placeholder="Nickname" value={nickname}/>
                        <Search onChange={({target}) => setPassword(target.value)} className="customInput" placeholder="Password" type="password" value={password}/>
                        <Button variant="contained" onClick={registration}>регистрация</Button>
                    </FormGroup>
                        :
                        <FormGroup className={style.signin}>
                            <Search onChange={({target}) => setUsername(target.value)} className="customInput" placeholder="Username" value={username}/>
                            <Search onChange={({target}) => setPassword(target.value)} className="customInput" placeholder="Password" type="password" value={password}/>
                            <FormControlLabel
                                label="Запомнить меня"
                                control={
                                    <Checkbox
                                        className={style.checkbox}
                                        onChange={({target})=>setChecked(target.checked)}
                                        checked={checked}
                                        icon={<CheckIcon/>}
                                        checkedIcon={<CheckedIcon/>}
                                    ></Checkbox>
                                }
                            />
                            <Button variant="contained" onClick={login}>Вход</Button>
                        </FormGroup>
                }
            </Box>
        </Modal>
    );
};

export default SignModal;