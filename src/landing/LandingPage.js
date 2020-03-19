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
                            <h1 style={{fontSize:'2.2em'}}>Work Efficiently</h1>
                            <p style={{width:'100%',fontSize:'1.25em'}}>Manage your household tasks easily and efficiently using Tasktion. Taskiton enable you to organize daily tasks and help you to stay organized</p>
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
