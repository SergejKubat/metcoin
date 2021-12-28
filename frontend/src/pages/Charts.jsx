import React, { useState, useEffect } from 'react';

import TransactionsPerBlock from 'components/Charts/TransactionsPerBlock';
import MinerChart from 'components/Charts/Miner';

const ChartsPage = () => {
    return (
        <div>
            <h1>ChartsPage</h1>
            <h2>Visual display of various Metcoin data</h2>
            <TransactionsPerBlock style={{ width: '50%' }} />
            <MinerChart style={{ width: '50%' }} />
        </div>
    );
};

export default ChartsPage;
