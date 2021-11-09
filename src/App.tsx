import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Home from 'screens/Home';
import Login from 'screens/Login';
import NotFound from 'screens/NotFound';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'styles/theme';
import { GlobalStyles } from 'styles/globalStyles';

function App(): JSX.Element {
    const isLoggedIn = useSelector(
        (state: RootState) => state.users.isLoggedIn
    );
    const darkMode = useSelector((state: RootState) => state.toggles.darkMode);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
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
        </ThemeProvider>
    );
}

export default App;
