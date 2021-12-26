import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Moment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';

import { MINING_REWARD_ADDRESS } from 'config';

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
                    <div className="details-row">
                        <div className="details-col">Hash</div>
                        <div className="details-col">{transaction.data.id}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Status</div>
                        <div className="details-col">
                            <span
                                className="transaction-item-status"
                                style={{
                                    color: transaction.status === 'Confirmed' ? '#28a745' : '#dc3545',
                                    backgroundColor: transaction.status === 'Confirmed' ? '#d1f0db' : '#f5d9d7'
                                }}>
                                {transaction.status}
                            </span>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Timestamp</div>
                        <div className="details-col">
                            <Moment format="DD/MM/YYYY hh:mm:ss">
                                {new Date(transaction.data.input.timestamp / 1000000).toISOString()}
                            </Moment>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Included in Block</div>
                        <div className="details-col">
                            {transaction.block === 'Transaction Pool' ? (
                                <span>Transaction Pool</span>
                            ) : (
                                <Link to={`/blocks/${transaction.block}`}>{transaction.block}</Link>
                            )}
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Total amount</div>
                        <div className="details-col">
                            {transaction.data.input.address === MINING_REWARD_ADDRESS ? (
                                <span>{Object.values(transaction.data.output)[0]} MTC</span>
                            ) : (
                                <span>{transaction.data.input.amount - transaction.data.output[transaction.data.input.address]} MTC</span>
                            )}
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Number of recipients:</div>
                        <div className="details-col">{Object.keys(transaction.data.output).length}</div>
                    </div>
                    <h2 style={{ marginTop: '2rem' }}>Input</h2>
                    <div className="transaction-row">
                        <div className="transaction-col">Address</div>
                        <div className="transaction-col">
                            {transaction.data.input.address === MINING_REWARD_ADDRESS ? (
                                <span>{transaction.data.input.address}</span>
                            ) : (
                                <span>
                                    <Link to={`/address/${transaction.data.input.address}`}>{transaction.data.input.address}</Link>
                                    <CopyToClipboard text={`${transaction.data.input.address}`}>
                                        <AiFillCopy className="icon-copy" />
                                    </CopyToClipboard>
                                </span>
                            )}
                        </div>
                    </div>
                    {transaction.data.input.address !== MINING_REWARD_ADDRESS ? (
                        <div>
                            <div className="transaction-row">
                                <div className="transaction-col">Public key</div>
                                <div className="transaction-col">{transaction.data.input.public_key}</div>
                            </div>
                            <div className="transaction-row">
                                <div className="transaction-col">Signature</div>
                                <div className="transaction-col">
                                    {transaction.data.input.signature[0]} <br /> {transaction.data.input.signature[1]}
                                </div>
                            </div>
                            <div className="transaction-row">
                                <div className="transaction-col">Amount</div>
                                <div className="transaction-col">{transaction.data.input.amount} MTC</div>
                            </div>
                        </div>
                    ) : null}
                    <h2 style={{ marginTop: '2rem' }}>Output</h2>
                    {Object.keys(transaction.data.output).map((item) => (
                        <div key={item}>
                            <div className="transaction-row">
                                <div className="transaction-col">Address</div>
                                <div className="transaction-col">
                                    <Link to={`/address/${item}`}>{item}</Link>
                                    <CopyToClipboard text={`${item}`}>
                                        <AiFillCopy className="icon-copy" />
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="transaction-row">
                                <div className="transaction-col">Amount</div>
                                <div className="transaction-col">{transaction.data.output[item]} MTC</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default TransactionPage;
