import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineArrowRight, AiFillCopy } from 'react-icons/ai';

import TransactionsPerBlock from 'components/Charts/TransactionsPerBlock';
import MinerChart from 'components/Charts/Miner';
import Spinner from 'components/Spinner';

import Logo from 'assets/images/logo.png';

const HomePage = () => {
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const requestBlocks = axios.get('http://127.0.0.1:5000/blockchain/range?start=0&end=5');
        const requestTransactions = axios.get('http://127.0.0.1:5000/transactions/range?start=0&end=5');

        axios
            .all([requestBlocks, requestTransactions])
            .then(
                axios.spread((...responses) => {
                    setBlocks(responses[0].data);
                    setTransactions(responses[1].data);
                })
            )
            .catch((errors) => {
                console.log(errors);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
            <div className="home-details">
                <TransactionsPerBlock />
                <MinerChart />
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <div style={{ marginTop: '3rem', overflowX: 'auto' }}>
                        <h2>Latest Blocks</h2>
                        <p>The most recently mined blocks</p>
                        <table className="table" style={{ marginTop: 0 }}>
                            <tbody>
                                <tr>
                                    <th>Number</th>
                                    <th>Hash</th>
                                    <th>Mined</th>
                                    <th>Miner</th>
                                    <th>Transactions</th>
                                </tr>
                                {blocks &&
                                    blocks.map((block) => (
                                        <tr key={block.hash}>
                                            <td>
                                                <Link to={`/blocks/${block.hash}`}>{block.number}</Link>
                                            </td>
                                            <td>
                                                <Link to={`/blocks/${block.hash}`}>{block.hash}</Link>
                                            </td>
                                            <td>
                                                <Moment fromNow>{new Date(block.timestamp / 1000000).toISOString()}</Moment>
                                            </td>
                                            <td>
                                                <Link to={`/address/${Object.keys(block.data[block.data.length - 1].output)[0]}`}>
                                                    {Object.keys(block.data[block.data.length - 1].output)[0]}
                                                </Link>
                                                <CopyToClipboard text={`${Object.keys(block.data[block.data.length - 1].output)[0]}`}>
                                                    <AiFillCopy className="icon-copy" />
                                                </CopyToClipboard>
                                            </td>
                                            <td>{block.data.length}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <Link to="/blocks">
                            <button className="button" style={{ marginTop: '2rem' }}>
                                View All Blocks <AiOutlineArrowRight style={{ marginLeft: 3 }} />
                            </button>
                        </Link>
                    </div>
                    <div style={{ marginTop: '3rem', overflowX: 'auto' }}>
                        <h2>Latest Transactions</h2>
                        <p>The most recently published unconfirmed transactions</p>
                        <table className="table" style={{ marginTop: 0 }}>
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
                        <Link to="/transactions">
                            <button className="button" style={{ marginTop: '2rem' }}>
                                View All Transactions <AiOutlineArrowRight style={{ marginLeft: 3 }} />
                            </button>
                        </Link>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default HomePage;
