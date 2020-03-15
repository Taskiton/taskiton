import React from 'react';
import './LandingPage.css';
import {landingPageStyle} from'./LandingPageStyle';
import Grid from '@material-ui/core/Grid';
import landingLogo from '../images/task-icons.svg'

const useStyles = landingPageStyle;

export default function LandingPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo1} style={{ backgroundColor: '' }}>
                        <p className={classes.landingMotto}>
                            <h1 style={{fontSize:'2.2em'}}>Suspendisse potenti.</h1>
                            <p style={{width:'100%',fontSize:'1.25em'}}>Vivamus lorem urna, viverra non pharetra ac, rhoncus a tortor. Nulla vestibulum ligula tortor, mattis tincidunt diam ultrices sit amet.</p>
                        </p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo1} style={{ backgroundColor: '' }}>
                        <img className={classes.landingPhoto} src={landingLogo} alt="mainpic"></img>
                        
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo2} style={{ backgroundColor: 'red' }}>Text2</div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo2} style={{ backgroundColor: 'Yellow' }}>Image2</div>
                </Grid>
            </Grid>
        </div>
    );
}
