import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Banana from './pages/Banana';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/banana" element={<Banana />} />
                </Routes>
            </>
        </Router>
    );
}

export default App;
