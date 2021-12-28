import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import Spinner from 'components/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend);

const MinerChart = ({ style }) => {
    const [minersData, setMinersData] = useState({});
    const [loading, setLoading] = useState(true);

    const data = {
        labels: Object.keys(minersData),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(minersData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/miner-percentage')
            .then((response) => {
                setMinersData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="chart" style={style}>
            <h3 className="chart-heading">Miner Percentage</h3>
            {loading ? <Spinner /> : <Pie data={data} />}
        </div>
    );
};

export default MinerChart;
