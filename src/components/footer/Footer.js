import React from 'react';
import style from './css/Footer.module.css';
import {
    Box,
    Container,
    Link,
    Typography,
} from "@mui/material";
import {NavLink} from "react-router-dom";
import {ReactComponent as Logo} from "../../media/mainPage/header/Logo.svg";
import {ReactComponent as Facebook} from "../../media/mainPage/footer/Facebook.svg";
import {ReactComponent as Instagram} from "../../media/mainPage/footer/Instagram.svg";
import {ReactComponent as Twitter} from "../../media/mainPage/footer/Twitter.svg";

const Footer = () => {
    return (
        <Box className={style.footer} component='footer'>
            <Container>
                <Box className={style.top}>
                    <Box className={style.logo}>
                        <NavLink to='/'>
                            <Logo/>
                            <Box className={style.logoText}>
                                <Typography variant='h3'>MangoRead</Typography>
                                <Typography paragraph>Читай мангу с нами</Typography>
                            </Box>
                        </NavLink>
                    </Box>
                    <Box className={style.links}>
                        <Link href="#"><Facebook/>Link One</Link>
                        <Link href="#"><Instagram/>Link Two</Link>
                        <Link href="#"><Twitter/>Link Three</Link>
                    </Box>
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6307.051589852468!2d-122.42250965472651!3d37.77771584865946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808eb456e2dd%3A0xcb1742ab59d38bda!2z0KHQuNCy0LjQuiDQodC10L3RgtC10YAsINCh0LDQvS3QpNGA0LDQvdGG0LjRgdC60L4sINCa0LDQu9C40YTQvtGA0L3QuNGPIDk0MTAyLCDQodCo0JA!5e0!3m2!1sru!2skg!4v1674495112170!5m2!1sru!2skg"
                        width="400" height="250" style={{borderRadius: 20, border: "none", filter: 'drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.15))'}} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Box>
            </Container>
            <hr/>
            <Box className={style.bottom}>
                <Typography component='span'>©2022, All right reserved.</Typography>
                <Box>
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms of Service</Link>
                    <Link href="#">Cookies Settings</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;