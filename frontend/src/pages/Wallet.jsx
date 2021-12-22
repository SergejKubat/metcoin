import React, { useState, useEffect } from 'react';

import axios from 'axios';
import QRCode from 'react-qr-code';

import CreateTransaction from 'components/CreateTransaction';

const WalletPage = () => {
    const [wallet, setWallet] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/wallet/info')
            .then((response) => {
                setWallet(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>My Wallet</h1>
            <h2>Information about my wallet</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <p>
                        Address: <b>{wallet.address}</b>
                    </p>
                    <p>
                        Balance: <b>{wallet.balance}</b>
                    </p>
                    <p>
                        Transactions: <b>{wallet.transactions.length}</b>
                    </p>
                    <QRCode value={`metcoin:${wallet.address}`} size={200} />
                    <CreateTransaction />
                </div>
            )}
        </div>
    );
};

export default WalletPage;
