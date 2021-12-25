import React from 'react';

import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ImArrowRight } from 'react-icons/im';
import { AiFillCopy } from 'react-icons/ai';

const TransactionItem = ({ transaction }) => {
    const { input, output } = transaction;
    const recipients = Object.keys(output);

    return (
        <div className="transaction-item">
            <h3 className="transaction-item-hash">
                Hash: <Link to={`/transactions/${transaction.id}`}>{transaction.id}</Link>
            </h3>
            <p className="transaction-item-timestamp">
                Timestamp: <Moment format="DD/MM/YYYY hh:mm:ss">{new Date(input.timestamp / 1000000).toISOString()}</Moment>
            </p>
            <div className="transaction-item-container">
                <div>
                    <Link to={`/address/${input.address}`}>{input.address}</Link>
                    <CopyToClipboard text={`${input.address}`}>
                        <AiFillCopy className="icon-copy" />
                    </CopyToClipboard>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ marginRight: '1rem' }}>{input.amount - output[input.address]} MTC</span>
                    <ImArrowRight className="transaction-item-icon" />
                </div>
                <div style={{ textAlign: 'right' }}>
                    {recipients
                        .filter((recipient) => recipient !== input.address)
                        .map((recipient) => (
                            <div key={recipient}>
                                <Link to={`/address/${recipient}`}>{recipient}</Link>
                                <CopyToClipboard text={`${recipient}`}>
                                    <AiFillCopy className="icon-copy" />
                                </CopyToClipboard>{' '}
                                {output[recipient]} MTC
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
