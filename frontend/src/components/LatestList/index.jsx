import React from 'react';

const LatestList = () => {
    return (
        <div>
            <h3>Latest blocks</h3>
            <p>The most recently mined blocks</p>
            <table className='latest-table'>
                <thead>
                    <th>Height</th>
                    <th>Mined</th>
                    <th>Miner</th>
                    <th>Transactions</th>
                </thead>
                <tr>
                    <td>123</td>
                    <td>2 minutes ago</td>
                    <td>hththt55yy</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>123</td>
                    <td>2 minutes ago</td>
                    <td>hththt55yy</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>123</td>
                    <td>2 minutes ago</td>
                    <td>hththt55yy</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>123</td>
                    <td>2 minutes ago</td>
                    <td>hththt55yy</td>
                    <td>7</td>
                </tr>
            </table>
        </div>
    );
};

export default LatestList;
