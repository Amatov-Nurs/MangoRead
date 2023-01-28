import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {
        access: "",
        refresh: "",
        username: "",
        image: "https://assets8.lottiefiles.com/avatars/default_user.jpg"
    },
    apply: false
};

export const signUp = createAsyncThunk('SignUp', async (data) => await axios.post("http://134.122.75.14:8666/api/auth/signup/", data));

export const signIn = createAsyncThunk('SignIn', async ({username, password, apply}) => {
    const response = await axios.post("http://134.122.75.14:8666/api/auth/signin/", {username, password});
    const {data} = await axios.get("http://134.122.75.14:8666/api/auth/profile/");
    const found = response.data !== "User not found, try again body!";
    const imageFile = data.filter(u => u.username === username)[0].image_file;
    if (apply) {
        localStorage.setItem("user", JSON.stringify(found));
        if (found) {
            alert("Вы успешно вошли в свой аккаунт!")
            localStorage.setItem("access", JSON.stringify(response.data.access));
            localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
            localStorage.setItem("username", JSON.stringify(response.data.user));
            localStorage.setItem("image", JSON.stringify(imageFile));
            return {...response.data, image: imageFile, apply: true};
        } else {
            alert("Упс что-то пошло не так!");
            return { access: "", refresh: "", apply: false};
        }
    } else {
        localStorage.setItem("user", JSON.stringify(false));
        if (found) {
            alert("Вы успешно вошли в свой аккаунт!");
            return {...response.data, image: imageFile, apply: true};
        } else {
            alert("Упс что-то пошло не так!");
            return { access: "", refresh: "", apply: false};
        }
    }
});

export const logout = createAsyncThunk('logout', async (refresh, {dispatch}) => {
    dispatch(setLogOut());
    await axios.post("http://134.122.75.14:8666/api/auth/logout/", {refresh: refresh});
});

export const getUser = createAsyncThunk('getUser', (data, {dispatch}) => dispatch(setUser(data)));

const authSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLogOut(state){
            state.user = {
                access: "",
                refresh: "",
                username: "",
                image: "https://assets8.lottiefiles.com/avatars/default_user.jpg"
            };
            localStorage.removeItem("user");
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("username");
            localStorage.removeItem("image");
            state.apply = false;
        }
    },
    extraReducers: (build) => {
        build
            .addCase(signIn.fulfilled, (state, action) => {
                state.user.access = action.payload?.access;
                state.user.refresh = action.payload?.refresh;
                state.user.username = action.payload?.user;
                state.user.image = action.payload?.image;
                state.apply = action.payload?.apply;
            });
    },
});

export default authSlice.reducer;
export const {setUser, setLogOut} = authSlice.actions;