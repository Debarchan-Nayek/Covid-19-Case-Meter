import React from 'react';
import './card.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup'


const Cards = (props) => {

    const {
        totalConfirmed,
        totalRecovered,
        totalDeaths,
        country,
    } = props;

    return(
        <div className="container" >
            <h1 className="heading"  style={{textTransform: 'capitalize'}}>{country === '' ? 'World Wide COVID-19 Report' : country}</h1>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className="card infected">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start={0}
                                end={totalConfirmed}
                                duration={3}
                                separator=","
                            />
                        </Typography>
                        <Typography variant="body2">Total infected by COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className="card recovered">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start={0}
                                end={totalRecovered}
                                duration={3}
                                separator=","
                            />
                        </Typography>                        
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                
                <Grid item component={Card} xs={12} md={3} className="card deaths">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start={0}
                                end={totalDeaths}
                                duration={3}
                                separator=","
                            />
                        </Typography> 
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>

                

            </Grid>
        </div>
    )
}

export default Cards;