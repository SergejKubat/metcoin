import React from 'react';

import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineWallet, AiOutlineBlock, AiOutlineTransaction, AiOutlineBarChart } from 'react-icons/ai';

const SideBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <Link to="/">
                    <li className="navbar-list-item">
                        <AiOutlineHome />
                        <span>Home</span>
                    </li>
                </Link>
                <Link to="/wallet">
                    <li className="navbar-list-item">
                        <AiOutlineWallet />
                        <span>Wallet</span>
                    </li>
                </Link>
                <Link to="/blocks">
                    <li className="navbar-list-item">
                        <AiOutlineBlock />
                        <span>Blocks</span>
                    </li>
                </Link>
                <Link to="/transactions">
                    <li className="navbar-list-item">
                        <AiOutlineTransaction />
                        <span>Transactions</span>
                    </li>
                </Link>
                <Link to="/charts">
                    <li className="navbar-list-item">
                        <AiOutlineBarChart />
                        <span>Charts</span>
                    </li>
                </Link>
            </ul>
        </nav>
    );
};

export default SideBar;
