import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "./mangasSlice";

const initialState = {
    manga: {
        genre: []
    },
    comments: [],
    isLoad: true
};

export const getManga = createAsyncThunk('manga/getManga', async (id) => {
    const {data} = await axios.get(URL+"manga/"+id);
    return data;
});

export const getComments = createAsyncThunk('comments/getComments', async (id) => {
    const {data} = await axios.get(URL+"manga/"+id+"/comments/");
    return data.reverse();
});

export const addComment = createAsyncThunk('addComment', async ({id, text, access}) => {
    await axios.post(URL+"manga/"+id+"/add-comment/", {text: text}, {
        headers: {
            Authorization: "Bearer "+access
        }
    });
});

const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getManga.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getManga.fulfilled, (state, action) => {
                state.manga = action.payload;
                state.isLoad = false;
            })
            .addCase(getComments.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.isLoad = false;
            });
    }
});

export default mangaSlice.reducer;