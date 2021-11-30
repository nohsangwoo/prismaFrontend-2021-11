import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'screens/Home';
import SignUp from 'screens/SignUp';
import routes from 'Router/routePath';
import Login from 'screens/Login';
import NotFound from 'screens/NotFound';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Layout from 'components/Layout';

const Index = () => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.users.isLoggedIn
    );

    return (
        <Router>
            <>
                <Routes>
                    <Route
                        path={routes.home}
                        element={
                            isLoggedIn ? (
                                <Layout>
                                    <Home />
                                </Layout>
                            ) : (
                                <Login />
                            )
                        }
                    />

                    {!isLoggedIn ? (
                        <Route path={routes.signUp} element={<SignUp />} />
                    ) : null}

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </>
        </Router>
    );
};

export default Index;
