import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Moment from 'react-moment';
import { Link, useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';
import { GiMineWagon } from 'react-icons/gi';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/transactions')
            .then((response) => {
                setTransactions(response.data.reverse());
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const mineNewBlock = () => {
        axios
            .get('http://127.0.0.1:5000/blockchain/mine')
            .then((response) => {
                navigate(`/blocks/${response.data.hash}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <React.Fragment>
            <h1>Latest Transactions</h1>
            <h2>The most recently published unconfirmed transactions</h2>
            <div style={{ overflowX: 'auto' }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Hash</th>
                                <th>From</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                            {transactions.length > 0 &&
                                transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>
                                            <Link to={`/transactions/${transaction.id}`}>{transaction.id}</Link>
                                        </td>
                                        <td>
                                            <Link to={`/address/${transaction.input.address}`}>{transaction.input.address}</Link>
                                            <CopyToClipboard text={`${transaction.input.address}`}>
                                                <AiFillCopy className="icon-copy" />
                                            </CopyToClipboard>
                                        </td>
                                        <td>{transaction.input.amount - transaction.output[transaction.input.address]} MTC</td>
                                        <td>
                                            <Moment fromNow>{new Date(transaction.input.timestamp / 1000000).toISOString()}</Moment>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
                {transactions.length > 0 ? (
                    <button className="button" style={{ marginTop: '2rem' }} onClick={mineNewBlock}>
                        Mine new Block <GiMineWagon style={{ marginLeft: 3 }} />
                    </button>
                ) : (
                    <p>No transactions yet.</p>
                )}
            </div>
        </React.Fragment>
    );
};

export default TransactionList;
