import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import Spinner from 'components/Spinner';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionsPerBlock = ({ style }) => {
    const [tpbData, setTpbData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/transactions-per-block')
            .then((response) => {
                setTpbData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const data = {
        labels: tpbData?.block,
        datasets: [
            {
                label: 'Transactions number',
                data: tpbData?.transactions,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    };

    const options = {
        responsive: true
    };

    return (
        <div className="chart" style={style}>
            <h3 className="chart-heading">Average Transactions Per Block</h3>
            {loading ? <Spinner /> : <Line data={data} options={options} />}
        </div>
    );
};

export default TransactionsPerBlock;
