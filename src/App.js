import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavBar from './landing/components/NavBar';
import HamNav from './landing/components/HamNav';
import LandingPage from './landing/LandingPage';
import Signup from './signup/Signup';
import Dashboard from './dashboard/Dashboard';

const useStyles = makeStyles(theme => ({
  nav: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    height: '8vh',
    [theme.breakpoints.down('xs')]: {
      height: '6vh',
    }
  }
}));

function App() {

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
    <Router>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          {(windowDimensions.width > 600) ? <Paper className={classes.nav}><NavBar /></Paper> : <Paper className={classes.nav}><HamNav /></Paper>}
        </Grid>
      </Grid>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default App;