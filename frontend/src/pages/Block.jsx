import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import TransactionItem from 'components/TransactionItem';

const BlockPage = () => {
    const [block, setBlock] = useState({});
    const [loading, setLoading] = useState(true);
    const { hash } = useParams();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/blocks/${hash}`)
            .then((response) => {
                setBlock(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [hash]);

    const calcTransactionVolume = (data) => {
        return data.reduce((accumulator, current) => {
            const recipients = Object.keys(current.output).filter((recipient) => recipient !== current.input.address);
            recipients.forEach((recipient) => (accumulator += current.output[recipient]));
            return accumulator;
        }, 0);
    };

    return (
        <React.Fragment>
            {!loading && (
                <div>
                    <h1>Block {block.number}</h1>
                    <p>Hash: {block.hash}</p>
                    <p>
                        Last hash: <Link to={`/blocks/${block.last_hash}`}>{block.last_hash}</Link>
                    </p>
                    <p>Timestamp: {block.timestamp}</p>
                    <p>Number of Transactions: {block.data.length}</p>
                    <p>
                        Miner:{' '}
                        <Link to={`/address/${Object.keys(block.data[block.data.length - 1].output)[0]}`}>
                            {Object.keys(block.data[block.data.length - 1].output)[0]}
                        </Link>
                    </p>
                    <p>Difficulty: {block.difficulty}</p>
                    <p>Nonce: {block.nonce}</p>
                    <p>Transaction Volume: {calcTransactionVolume(block.data)} MTC</p>
                    <p>Block reward: {Object.values(block.data[block.data.length - 1].output)[0]} MTC</p>
                    <h2>Block Transactions</h2>
                    {[...block.data].splice(0, block.data.length - 1).map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default BlockPage;
