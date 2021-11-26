import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'styles/theme';
import { GlobalStyles } from 'styles/globalStyles';
import { HelmetProvider } from 'react-helmet-async';
import Router from 'Router';
import { client } from 'apollo/apollo';
import Header from 'components/Header';
import Layout from 'components/Layout';

function App(): JSX.Element {
    const darkMode = useSelector((state: RootState) => state.toggles.darkMode);
    const isLoggedIn = useSelector(
        (state: RootState) => state.users.isLoggedIn
    );
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router />
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}
export default App;
