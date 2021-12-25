import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';
import Moment from 'react-moment';

const BlockList = () => {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/blockchain')
            .then((response) => {
                setBlocks(response.data.slice(1).reverse());
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
                )}
                {blocks.length === 0 && <p>No mined blocks yet.</p>}
            </div>
        </React.Fragment>
    );
};

export default BlockList;
