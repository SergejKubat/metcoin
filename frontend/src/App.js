import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import WalletPage from './pages/Wallet';
import BlockList from 'pages/BlockList';
import TransactionList from 'pages/TransactionList';
import ChartsPage from './pages/Charts';
import BlockPage from './pages/Block';
import TransactionPage from './pages/Transaction';

import Layout from 'components/Layout/Layout';

import './assets/sass/app.scss';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/blocks/:hash" element={<BlockPage />} />
                    <Route path="/blocks" element={<BlockList />} />
                    <Route path="/transactions/:hash" element={<TransactionPage />} />
                    <Route path="/transactions" element={<TransactionList />} />
                    <Route path="/charts" element={<ChartsPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
