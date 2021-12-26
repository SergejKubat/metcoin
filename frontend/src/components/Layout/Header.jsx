import React from 'react';

import { Link } from 'react-router-dom';
import { AiOutlineWallet } from 'react-icons/ai';

import Logo from 'assets/images/logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src={Logo} alt="Metcoin Logo" className="header-logo-img" />
                <span className="header-logo-text">Metcoin</span>
            </div>
            <Link to="/wallet" className="header-wallet">
                <AiOutlineWallet className="header-wallet-icon" />
                <p>123 MTC</p>
            </Link>
        </header>
    );
};

export default Header;
