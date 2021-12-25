import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTransaction = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    const transfer = (e) => {
        e.preventDefault();
        if (!recipient || !Number(amount)) {
            console.log('error');
            return;
        }
        axios
            .post('http://127.0.0.1:5000/wallet/transact', {
                recipient: recipient,
                amount: Number(amount)
            })
            .then(() => {
                navigate('/transactions');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="ct">
            <h2>Transfer Metcoin</h2>
            <form className="form" onSubmit={transfer}>
                <label htmlFor="recipient" className="form-label">
                    Recipient:
                </label>
                <input
                    type="text"
                    id="recipient"
                    name="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="form-input"
                />
                <label htmlFor="amount" className="form-label">
                    Amount:
                </label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input"
                />
                <button className="form-btn">Transfer</button>
            </form>
        </div>
    );
};

export default CreateTransaction;
