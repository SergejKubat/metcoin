import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/transactions')
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                                <th>To</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                            {transactions &&
                                transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>
                                            <Link to={`/transactions/${transaction.id}`}>{transaction.id}</Link>
                                        </td>
                                        <td>
                                            <Link to={`/address/${transaction.input.address}`}>{transaction.input.address}</Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/address/${
                                                    Object.keys(transaction.output)[Object.keys(transaction.output).length - 1]
                                                }`}>
                                                {Object.keys(transaction.output)[Object.keys(transaction.output).length - 1]}
                                            </Link>
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
            </div>
        </React.Fragment>
    );
};

export default TransactionList;
