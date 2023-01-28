import {createTheme, styled} from '@mui/material/styles';
import {Pagination, TextField} from "@mui/material";

export const Search = styled(TextField)({
    '& fieldset': {
        width: 342,
        height: 56,
    },
    '& .MuiInputBase-root': {
        width: 342,
        height: 51,
        borderRadius: '8px',
        backgroundColor: '#fff',
        zIndex: 1
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 8,
            border: '2px solid #878787',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#AD02E0',
        },
    },
});

export const DateTextField = styled(TextField)({
    '& input': {
        caretColor: "#2FE09B"
    },
    '& fieldset': {
        width: 168,
        height: 55,
        borderRadius: 8,
        border: '2px solid #2FE09B !important',
    },
    '& .MuiInputBase-root': {
        width: 168,
        height: 50,
        borderRadius: '8px',
        backgroundColor: '#fff',
        "& input": {
            padding: 15
        }
    },
});

export const Pagination_ = styled(Pagination)({
    '&': {
        margin: '28px 0 32px'
    },
    '& button:active': {
        background: "none !important"
    },
    '& .Mui-selected': {
        minWidth: '45px !important',
        minHeight: '45px !important',
        color: "#fff !important",
        padding: "0 !important"
    },
    '& .MuiButtonBase-root': {
        padding: '0 13px',
        margin: 0,
        minWidth: 'max-content',
        minHeight: 45,
        fontWeight: 400,
        fontSize: 24,
        lineHeight: 35,
        borderRadius: '50%',
        color: "#A5A5A5"
    },
    '& .MuiPaginationItem-ellipsis': {
        margin: 0,
        fontWeight: 400,
        fontSize: 45,
        lineHeight: '55px',
        color: "#A5A5A5"
    },
    '& .MuiPaginationItem-previousNext': {
        marginLeft: 32
    }
});

export const theme = createTheme({
    palette:{
        primary: {
            main: '#AD02E0'
        },
        secondary: {
            main: '#2FE09B'
        },
        success: {
            main: '#878787'
        },
    }
});