import React from 'react';
import './LandingPage.css';
import {landingPageStyle} from'./LandingPageStyle';
import Grid from '@material-ui/core/Grid';
import landingLogo from '../images/task-icons.svg';
import Pricing from './components/Pricing';


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
                            <p style={{width:'100%',fontSize:'1.25em'}}>Manage your household tasks easily and efficiently using Tasktion. Taskiton enable you to organize daily tasks and help you to stay productive.</p>
                        </p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo1} style={{ backgroundColor: '' }}>
                        {/* Image Ref: https://www.vecteezy.com/vector-art/286796-flat-modern-minimalist-graphic-design-software-vector-illustration */}
                        <img className={classes.landingPhoto} src={landingLogo} alt="mainpic"></img>
                        
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.promo1}>
                        <Pricing/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
