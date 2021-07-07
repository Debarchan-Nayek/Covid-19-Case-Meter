import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import './chart.css';

const Chart = (props) => {
    const {
        yAxisConfirmed,
        label,
        yAxisDeaths,
        yAxisRecovered,
    } = props;

    return (
        <div className="container">
        <Typography className="graphHeading">Total Confirmed Cases</Typography>
            <Line className="Graphs"
                data={{
                    labels: label.map(l => l.substr(0, 10)),

                    datasets: [{
                        data: yAxisConfirmed,
                        label: 'Infected',
                        borderColor: '#3333ff',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: false,            
                    }]
                }}
            />

        <Typography className="graphHeading">Total Death Reports</Typography>
            <Line className="Graphs"
                data={{
                    labels: label.map(l => l.substr(0, 10)),
                    
                    datasets: [
                        {
                        data: yAxisDeaths,
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: false,                     
                    }
                    ]
                }}
            />


        <Typography className="graphHeading">Total Recovered Cases</Typography>
            <Line className="Graphs"
                data={{
                    labels: label.map(l => l.substr(0, 10)),
                    
                    datasets: [
                        {
                        data: yAxisRecovered,
                        label: 'Recovered',
                        borderColor: 'green',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: false,                     
                    }
                    ]
                }}
            />

        </div>

    )

}


export default Chart;

