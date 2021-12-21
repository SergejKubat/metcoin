import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import WalletPage from './pages/Wallet';
import BlockPage from './pages/Block';
import TransactionPage from './pages/Transaction';
import ChartsPage from './pages/Charts';

import './assets/sass/app.scss';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/blocks/:hash" element={<BlockPage />} />
                <Route path="/transactions/:hash" element={<TransactionPage />} />
                <Route path="/charts" element={<ChartsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
