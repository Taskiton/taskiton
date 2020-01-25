import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar';
import HamNav from './components/HamNav';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    nav: {
        padding: theme.spacing(2),
        textAlign: 'right',
        color: theme.palette.text.secondary,
        height: '8vh',
        [theme.breakpoints.down('xs')]: {
            height: '6vh',
        }
    },
    promo1: {
        height: '92vh',
        [theme.breakpoints.down('xs')]: {
            height: '47vh',
        }
    },
    promo2: {
        height: '100vh',
        [theme.breakpoints.down('xs')]: {
            height: '47vh',
        }
    }
}));

export default function LandingPage() {
    const classes = useStyles();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} >
                    {(windowDimensions.width>600)?<Paper className={classes.nav}><NavBar /></Paper>:<Paper className={classes.nav}><HamNav /></Paper>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo1} style={{ backgroundColor: 'Orange' }}>Image1</div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo1} style={{ backgroundColor: 'Pink' }}>Text1 (Scroll down!)</div>
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

//@Yalcin Delete the inline styles

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}