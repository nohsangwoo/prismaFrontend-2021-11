import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Home from 'screens/Home';
import Login from 'screens/Login';
import NotFound from 'screens/NotFound';

function App(): JSX.Element {
    const isLoggedIn = useSelector(
        (state: RootState) => state.users.isLoggedIn
    );

    return (
        <Router>
            <>
                <Routes>
                    <Route
                        path="/"
                        element={isLoggedIn ? <Home /> : <Login />}
                    />
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </>
        </Router>
    );
}

export default App;
