import React, { useState, useEffect } from 'react';

import axios from 'axios';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';

import CreateTransaction from 'components/CreateTransaction';
import TransactionItem from 'components/TransactionItem';
import Spinner from 'components/Spinner';

import { calculateTotalSpent } from 'utils/transaction';

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
                <Spinner />
            ) : (
                <div className="wallet">
                    <div className="wallet-container">
                        <div className="wallet-qr">
                            <QRCode value={`metcoin:${wallet.address}`} size={200} />
                        </div>
                        <div className="wallet-details">
                            <div className="details-row">
                                <div className="details-col">Address</div>
                                <div className="details-col">
                                    {wallet.address}{' '}
                                    <CopyToClipboard text={`${wallet.address}`}>
                                        <AiFillCopy className="icon-copy" />
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Total received</div>
                                <div className="details-col">
                                    {wallet.balance + calculateTotalSpent(wallet.transactions, wallet.address)} MTC
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Total sent</div>
                                <div className="details-col">{calculateTotalSpent(wallet.transactions, wallet.address)} MTC</div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Balance</div>
                                <div className="details-col">{wallet.balance} MTC</div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Number of Transactions:</div>
                                <div className="details-col">{wallet.transactions.length}</div>
                            </div>
                        </div>
                    </div>
                    <CreateTransaction />
                    <h2 style={{ marginTop: '2rem' }}>Transactions</h2>
                    {wallet.transactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WalletPage;
