import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TransactionPage = () => {
    const [transaction, setTransaction] = useState({});
    const [loading, setLoading] = useState(true);
    const { hash } = useParams();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/transactions/${hash}`)
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [hash]);

    return (
        <React.Fragment>
            {!loading && (
                <div>
                    <h1>Transaction Details</h1>
                    <p>Hash: {transaction.id}</p>
                    <p>Status: Confirmed</p>
                    <p>Timestamp: {new Date(transaction.input.timestamp / 1000000).toISOString()}</p>
                    <p>Included in block: Transaction Pool</p>
                    <p>Total amount: {transaction.input.amount - transaction.output[transaction.input.address]} MTC</p>
                    <p>Number of recipients: {Object.keys(transaction.output).length - 1}</p>
                    <h2>Input</h2>
                    <p>
                        Address: <Link to={`/address/${transaction.input.address}`}>{transaction.input.address}</Link>
                    </p>
                    <p>Public key: {transaction.input.public_key}</p>
                    <p>
                        Signature: {transaction.input.signature[0]} <br /> {transaction.input.signature[1]}
                    </p>
                    <p>Amount: {transaction.input.amount}</p>
                    <h2>Output</h2>
                </div>
            )}
        </React.Fragment>
    );
};

export default TransactionPage;
