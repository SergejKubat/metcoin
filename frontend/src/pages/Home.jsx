import React from 'react';

import Logo from 'assets/images/logo.png';

const HomePage = () => {
    return (
        <div className="home">
            <div className="home-heading">
                <img src={Logo} alt="Metcoin Logo" className="home-logo" />
                <h1>Metcoin</h1>
            </div>
            <h2>
                Metcoin cryptocurrency information about the most recently mined blocks, unconfirmed transactions, and data for the latest
                transactions.
            </h2>
        </div>
    );
};

export default HomePage;
