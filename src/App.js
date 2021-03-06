import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavBar from './landing/components/NavBar';
import HamNav from './landing/components/HamNav';
import LandingPage from './landing/LandingPage';
import Signup from './signup/Signup';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Analytics from './Analytics/Analytics';
import Team from './Team/teamProfile';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import Contact from './contact/Contact';
import { HashRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  nav: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    height: '4vh',
    [theme.breakpoints.down('xs')]: {
      height: '56px',
    }
  }
}));

function App() {

  const classes = useStyles();
  const [login,setLogin] = useState({check:'false'});
  
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const context = useContext(AuthContext);
  const {isAuthenticated} = context;
  return (
      <HashRouter >
        <Grid container spacing={0}>
          <Grid item xs={12} >
            {(windowDimensions.width > 600) ? <Paper className={classes.nav}>
              <NavBar /></Paper> : 
              <Paper className={classes.nav}>
                
                <HamNav /></Paper>}
          </Grid>
        </Grid>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/contact" component={Contact} />
          {isAuthenticated?
            <div>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/analytics" component={Analytics} />
            </div>:''}
          <Redirect to='/' />
        </Switch>
      </HashRouter >
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
