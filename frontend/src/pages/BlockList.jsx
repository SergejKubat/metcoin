import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const BlockList = () => {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://127.0.0.1:5000/blockchain')
            .then((response) => {
                setBlocks(response.data.slice(1));
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
            <h1>Latest blocks</h1>
            <h2>The most recently mined blocks</h2>
            <div style={{ overflowX: 'auto' }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table className="table">
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
                                            <Link to={`/blocks/${block.hash}`}>123</Link>
                                        </td>
                                        <td>
                                            <Link to={`/blocks/${block.hash}`}>{block.hash}</Link>
                                        </td>
                                        <td>{new Date(block.timestamp / 1000).toISOString()}</td>
                                        <td>
                                            <Link to={`/address/${Object.keys(block.data[block.data.length - 1].output)[0]}`}>
                                                {Object.keys(block.data[block.data.length - 1].output)[0]}
                                            </Link>
                                        </td>
                                        <td>{block.data.length}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </React.Fragment>
    );
};

export default BlockList;
