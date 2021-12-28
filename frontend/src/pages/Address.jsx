import React, { useState, useEffect } from 'react';

import axios from 'axios';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';

import TransactionItem from 'components/TransactionItem';
import Spinner from 'components/Spinner';

import { calculateTotalSpent } from 'utils/transaction';

const Address = () => {
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/wallet/${id}`)
            .then((response) => {
                setAddress(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <React.Fragment>
            <h1>Address Details</h1>
            <h2>Information about address</h2>
            {loading ? (
                <Spinner />
            ) : (
                <div className="wallet">
                    <div className="wallet-container">
                        <div className="wallet-qr">
                            <QRCode value={`metcoin:${address.address}`} size={200} />
                        </div>
                        <div className="wallet-details">
                            <div className="details-row">
                                <div className="details-col">Address</div>
                                <div className="details-col">
                                    {address.address}{' '}
                                    <CopyToClipboard text={`${address.address}`}>
                                        <AiFillCopy className="icon-copy" />
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Total received</div>
                                <div className="details-col">
                                    {address.balance + calculateTotalSpent(address.transactions, address.address)} MTC
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Total sent</div>
                                <div className="details-col">{calculateTotalSpent(address.transactions, address.address)} MTC</div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Balance</div>
                                <div className="details-col">{address.balance} MTC</div>
                            </div>
                            <div className="details-row">
                                <div className="details-col">Number of Transactions:</div>
                                <div className="details-col">{address.transactions.length}</div>
                            </div>
                        </div>
                    </div>
                    <h2 style={{ marginTop: '2rem' }}>Transactions</h2>
                    {address.transactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default Address;
