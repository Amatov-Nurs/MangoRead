import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    List, ListItem,
    Typography
} from "@mui/material";
import {Link, NavLink} from "react-router-dom";
import {Search} from "../themes/Themes";
import {getUser, logout} from "../../redux/slices/authSlice";
import {getSearch} from "../../redux/slices/mangasSlice";
import style from './css/Header.module.css';
import {ReactComponent as Logo} from "../../media/mainPage/header/Logo.svg";
import {ReactComponent as SearchIcon} from "../../media/mainPage/header/search.svg";
import {ReactComponent as ArrowDown} from "../../media/aboutPage/arrow_drop_down.svg";
import SignModal from "./SignModal";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state?.mangas?.search?.result);
    const isLoad = useSelector(state => state?.mangas?.search?.isLoad);
    const apply = useSelector(state => state?.auth?.apply);
    const refresh = useSelector(state => state?.auth?.user?.refresh);
    const username = useSelector(state => state?.auth?.user?.username);
    const image = useSelector(state => state?.auth?.user?.image);
    const [btn, setBtn] = useState(1);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [log, setLog] = useState(false);
    const [open, setOpen] = useState(false);
    const user = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : false;

    const login = () => {
        setLog(true);
        setModal(true);
    };
    const sign = () => {
        setLog(false);
        setModal(true);
    };
    const Logout = () => {
        setOpen(false);
        dispatch(logout(refresh))
    };

    const handleSearch = ({target}) => {
        setSearch(target.value);
        dispatch(getSearch(target.value));
    };

    const handleClick = () => {
        setSearch("");
        dispatch(getSearch(""));
    };

    useEffect(() => {
        const data = (key) => JSON.parse(localStorage.getItem(key));
        user
        && dispatch(getUser({
            refresh: data("refresh"),
            access: data("access"),
            username: data("username"),
            image: data("image"),
        }));
    }, [dispatch, apply, user]);
    return (
        <AppBar className={style.header}>
            <Container>
                <Box className={style.logo}>
                    <NavLink to='/'>
                        <Logo/>
                        <Box className={style.logoText}>
                            <Typography variant='h3'>MangoRead</Typography>
                            <Typography>Читай мангу с нами</Typography>
                        </Box>
                    </NavLink>
                </Box>
                <Box className={style.search}>
                    <SearchIcon style={{opacity: btn, transition: '.3s'}}/>
                    <Search
                        placeholder="Placeholder"
                        onBlur={()=>setBtn(1)}
                        onFocus={()=>setBtn(0)}
                        onChange={handleSearch}
                        value={search}
                        sx={{
                            '& input': {
                                paddingLeft: btn ? '50px' : '16px',
                                transition: '.3s'
                            }
                        }}
                    />
                    <Box
                        className={style.filtered}
                        sx={!btn ? {borderColor: "#AD02E0"} : {borderColor: "#878787 !important"}}
                        style={filter.length > 0 ? {display: "block"} : {display: "none"}}
                    >
                        {
                            !isLoad &&
                                <>
                                <Typography component="span">{
                                    filter.length > 1
                                        ? `Более ${filter.length} найденных манг!`
                                        : filter.length === 1 ? "Найдена 1 манга!" : "Ничего не найдена"
                                }</Typography>
                                    <List>
                                {
                                    filter.map(m => <ListItem key={m?.id}>
                                    <Link to={"/"+m?.id} onClick={handleClick}>{m?.ru_name}</Link>
                                    </ListItem>)
                                }
                                    </List>
                                </>
                        }
                    </Box>
                </Box>
                <Box className={style.sign}>
                    {
                        username === ""
                            ?
                            <>
                                <Button variant='outlined' onClick={login}>Войти</Button>
                                <Button variant='contained' onClick={sign}>Регистрация</Button>
                                <SignModal open={modal} setModal={setModal} log={log} setLog={setLog}></SignModal>
                            </>
                            :
                            <>
                                <Typography component="h3">{username}</Typography>
                                <Box component="img" alt="" src={image}/>
                                <Box
                                    className={style.hide}
                                >
                                    <Button onClick={() => setOpen(!open)}>
                                        <ArrowDown style={!open ? {transform: "rotate(0)"} : {transform: "rotate(180deg)"}}/>
                                    </Button>
                                    <Button onClick={Logout} sx={!open ? {display: "none !important"} : {display: "inline-block !important"}} color="error">Выйти</Button>
                                </Box>
                            </>
                    }
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;