import React from 'react';

import { Link } from 'react-router-dom';

const BlockList = () => {
    return (
        <React.Fragment>
            <h1>Latest blocks</h1>
            <h2>The most recently mined blocks</h2>
            <div style={{ overflowX: 'auto' }}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Number</th>
                            <th>Hash</th>
                            <th>Mined</th>
                            <th>Miner</th>
                            <th>Transactions</th>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/blocks/123">123</Link>
                            </td>
                            <td>
                                <Link to="/blocks/123">0...361f8a8589bf395305416aba0a359c7a33e9d8a8dcfbc</Link>
                            </td>
                            <td>2 min</td>
                            <td>
                                <Link to="/address/56545tgg">56545tgg</Link>
                            </td>
                            <td>32</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/blocks/123">123</Link>
                            </td>
                            <td>
                                <Link to="/blocks/123">0...0361f8a8589bf395305416aba0a359c7a33e9d8a8dcfbc</Link>
                            </td>
                            <td>2 min</td>
                            <td>
                                <Link to="/address/56545tgg">56545tgg</Link>
                            </td>
                            <td>32</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/blocks/123">123</Link>
                            </td>
                            <td>
                                <Link to="/blocks/123">0...0361f8a8589bf395305416aba0a359c7a33e9d8a8dcfbc</Link>
                            </td>
                            <td>2 min</td>
                            <td>
                                <Link to="/address/56545tgg">56545tgg</Link>
                            </td>
                            <td>32</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/blocks/123">123</Link>
                            </td>
                            <td>
                                <Link to="/blocks/123">0...0361f8a8589bf395305416aba0a359c7a33e9d8a8dcfbc</Link>
                            </td>
                            <td>2 min</td>
                            <td>
                                <Link to="/address/56545tgg">56545tgg</Link>
                            </td>
                            <td>32</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/blocks/123">123</Link>
                            </td>
                            <td>
                                <Link to="/blocks/123">0...0361f8a8589bf395305416aba0a359c7a33e9d8a8dcfbc</Link>
                            </td>
                            <td>2 min</td>
                            <td>
                                <Link to="/address/56545tgg">56545tgg</Link>
                            </td>
                            <td>32</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default BlockList;
