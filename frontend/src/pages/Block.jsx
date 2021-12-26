import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Moment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';

import TransactionItem from 'components/TransactionItem';

import { calcTransactionVolume } from 'utils/transaction';

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

    return (
        <React.Fragment>
            {!loading && (
                <div>
                    <h1>Block Details</h1>
                    <div className="details-row">
                        <div className="details-col">Hash</div>
                        <div className="details-col">{block.hash}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Last hash</div>
                        <div className="details-col">
                            <Link to={`/blocks/${block.last_hash}`}>{block.last_hash}</Link>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Number</div>
                        <div className="details-col">{block.number}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Timestamp</div>
                        <div className="details-col">
                            <Moment format="DD/MM/YYYY hh:mm:ss">{new Date(block.timestamp / 1000000).toISOString()}</Moment>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Number of Transactions</div>
                        <div className="details-col">{block.data.length}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Miner</div>
                        <div className="details-col">
                            <Link to={`/address/${Object.keys(block.data[block.data.length - 1].output)[0]}`}>
                                {Object.keys(block.data[block.data.length - 1].output)[0]}
                            </Link>
                            <CopyToClipboard text={`${Object.keys(block.data[block.data.length - 1].output)[0]}`}>
                                <AiFillCopy className="icon-copy" />
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Difficulty</div>
                        <div className="details-col">{block.difficulty}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Nonce</div>
                        <div className="details-col">{block.nonce}</div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Transaction Volume</div>
                        <div className="details-col">{calcTransactionVolume(block.data)} MTC</div>
                    </div>
                    <div className="details-row">
                        <div className="details-col">Block reward</div>
                        <div className="details-col">{Object.values(block.data[block.data.length - 1].output)[0]} MTC</div>
                    </div>
                    <h2 style={{ marginTop: '2rem' }}>Block Transactions</h2>
                    {block.data.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default BlockPage;
