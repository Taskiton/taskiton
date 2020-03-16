/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(2),
    paddingRight: '10%',
    //Contunie here, its not good for hambuger button
    //   "&:nth-child(1)": {
    //     marginLeft:'20%'
    //  },
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      padding: '2vh',
    }
  },
  buttonStyle: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#F76C6C',
    color: 'white',
    fontSize: '0.5',
    marginTop: -5,
    //Media Query for mobile version
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginLeft: 0
    },
    '&:hover': {
      backgroundColor: '#dc5a5a',
      borderColor: '#dc5a5a',
      boxShadow: 'none',
    }
  },
  linkStyle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '1em',
    textDecoration: 'none',
    fontFamily: 'sans-serif',
    position: 'relative',
    left: '5vw',
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: theme.spacing(1),
      position: 'relative',
      left: '5vw'
    },
    [theme.breakpoints.down('sm')]: {

      position: 'relative',
      left: '1vw'
    },

  }

}));
NavBar.defaultProps = {
  isHamNav: false,
}
export default function NavBar(props) {

  const context = useContext(AuthContext);
  const { isAuthenticated, toggleAuth} = context;

  const classes = useStyles();

  const preventDefault = event => event.preventDefault();

  const linkStyle = (props.isHamNav) ?
    {
      display: 'block',
      textAlign: 'center',
      paddingTop: '20%',
      margin: 'auto',
      // boxShadow: '0px 2px #888888',
    } : {
      paddingRight: '5%',
      float: 'left',
    };

  let history = useHistory();
  let handleSignout = () => {
    history.push("/");
    toggleAuth();
  }

  return (

    <div>
      <Typography className={classes.root} >
        <Box className={classes.linkStyle}>
          <Link to="/" style={linkStyle} className={classes.linkStyle}>
            Home
      </Link>

          <Link to="/team" style={linkStyle} className={classes.linkStyle}>
            Team
      </Link>
          <Link to="/" style={linkStyle} className={classes.linkStyle}>
            Contact Us
      </Link>
      {isAuthenticated?
        <div>
          <Link to="/analytics" style={linkStyle} className={classes.linkStyle}>
                Analytics
          </Link>
          <Link to="/dashboard" style={linkStyle} className={classes.linkStyle}>
                Dashboard
          </Link>
        </div> : ''}
      
        </Box>
        <Box component="span" >
        {!isAuthenticated?
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained" className={classes.buttonStyle} style={{ backgroundColor: '#000000' }}>Signup</Button>
          </Link>:""}
          {isAuthenticated?
            <Button variant="contained" className={classes.buttonStyle} onClick={handleSignout}>
              Signout
            </Button>
          :""}
        </Box>
      </Typography>
    </div>
  );
}