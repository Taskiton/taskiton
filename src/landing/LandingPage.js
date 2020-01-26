import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar';
import HamNav from './components/HamNav';
import landingLogo from '../images/task-icons.svg'

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
            height: '60vh',
        }
    },
    promo2: {
        height: '100vh',
        [theme.breakpoints.down('xs')]: {
            height: '50vh',
        }
    },
    landingPhoto:{
        width:'80%',
        margin:'auto',
        padding:theme.spacing(7),
        paddingTop:'6vh',
        [theme.breakpoints.between('xs','sm')]: {
            paddingTop:'15vh',
            padding:0,
            width:'100%'
        },
        [theme.breakpoints.down('xs')]: {
            padding:0
        }

    },
    landingMotto:{
        paddingTop:'20vh',
        width:'50%',
        margin:'auto',
        [theme.breakpoints.down('xs')]: {
            paddingTop:'10vh',
            width:'80%',
            textAlign:'center'
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
                    <div className={classes.promo1} style={{ backgroundColor: '' }}>
                        <p className={classes.landingMotto}>
                            <h1 style={{fontSize:'2.2em'}}>Suspendisse potenti.</h1>
                            <p style={{width:'100%',fontSize:'1.25em'}}>Vivamus lorem urna, viverra non pharetra ac, rhoncus a tortor. Nulla vestibulum ligula tortor, mattis tincidunt diam ultrices sit amet.</p>
                        </p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.promo1} style={{ backgroundColor: '' }}>
                        <img className={classes.landingPhoto} src={landingLogo} ></img>
                        
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

//@Yalcin Delete the inline styles

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}