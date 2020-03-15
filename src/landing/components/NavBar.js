/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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
          <Link to="/dashboard" style={linkStyle} className={classes.linkStyle}>
            Contact Us
      </Link>
      <Link to="/analytics" style={linkStyle} className={classes.linkStyle}>
            Analytics
      </Link>
        </Box>
        <Box component="span" >

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained" className={classes.buttonStyle} style={{ backgroundColor: '#000000' }}>Signup</Button>
          </Link>

          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button variant="contained" className={classes.buttonStyle}>
              Dashboard
            </Button>
          </Link>
        </Box>
      </Typography>
    </div>
  );
}