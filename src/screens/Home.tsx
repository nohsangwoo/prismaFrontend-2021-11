import React from 'react';
import { useDispatch } from 'react-redux';
import userSlice from 'store/reducers/userSlice';
const Home = (): JSX.Element => {
    const dispatch = useDispatch();
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => dispatch(userSlice.actions.setLoggedOut())}>
                Log Out!
            </button>
        </div>
    );
};

export default Home;
