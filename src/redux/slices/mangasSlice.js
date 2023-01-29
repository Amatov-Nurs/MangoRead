import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const URL = "http://134.122.75.14:8666/api/v1/";

const initialState = {
    mangas: {
        count: 0,
        results: []
    },
    params: {
        type: {},
        genre: {},
    },
    search: {
        result: [],
        isLoad: false,
    },
    isLoad: true
};

export const getSearch = createAsyncThunk('search', async (search) => {
    const {data} = await axios.get(URL+"manga/?search="+search);
    if (search === "") {
        return [];
    } else {
        return data;
    }
});

export const getMangas = createAsyncThunk('mangas/getMangas', async (params) => {
    const {data} = await axios.get(URL+"top-manga/", {params: params});
    return data;
});

export const getMangasByGenre = createAsyncThunk('getMangasByGenre', (genre, {dispatch}) => {
    dispatch(setGenre(genre));
});

export const getMangasByType = createAsyncThunk('getMangasByType', (type, {dispatch}) => {
    dispatch(setType(type));
});

const mangasSlice = createSlice({
    name: 'mangas',
    initialState,
    reducers: {
        setType(state, action) {
            state.params.type = action.payload
        },
        setGenre(state, action) {
            state.params.genre = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMangas.fulfilled, (state, action) => {
                state.mangas = action.payload
                state.isLoad = false
            })
            .addCase(getSearch.pending, (state) => {
                state.search.isLoad = true;
            })
            .addCase(getSearch.fulfilled, (state, action) => {
                state.search.result = action.payload;
                state.search.isLoad = false;
            })
    }
});

export default mangasSlice.reducer;
export  const {setType, setGenre} = mangasSlice.actions;