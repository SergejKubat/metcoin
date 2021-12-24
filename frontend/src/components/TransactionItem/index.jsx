import React from 'react';

import { Link } from 'react-router-dom';
import { ImArrowRight } from 'react-icons/im';

const TransactionItem = ({ transaction }) => {
    const { input, output } = transaction;
    const recipients = Object.keys(output);

    return (
        <div className="transaction-item">
            <h3 className="transaction-item-hash">
                Hash: <Link to={`/transactions/${transaction.id}`}>{transaction.id}</Link>
            </h3>
            <p className="transaction-item-timestamp">Timestamp: {new Date(input.timestamp / 1000000).toISOString()}</p>
            <div className="transaction-item-container">
                <div>
                    <Link to={`/address/${input.address}`}>{input.address}</Link>
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
                                <Link to={`/address/${recipient}`}>{recipient}</Link> {output[recipient]} MTC
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
