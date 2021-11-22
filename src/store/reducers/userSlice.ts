import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    userInfo: {
        uid: string;
        displayName: string;
    };
    isLoggedIn: boolean;
    token: string;
};

const initialState: InitialState = {
    userInfo: {
        uid: '',
        displayName: ''
    },
    isLoggedIn: false,
    token: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        setLoggedIn(state) {
            state.isLoggedIn = true;
        },
        setLoggedOut(state) {
            state.isLoggedIn = false;
        },
        setToken(state, action) {
            state.token = action.payload;
        }
    }
});

export default userSlice;
