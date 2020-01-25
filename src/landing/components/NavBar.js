/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
      marginLeft: theme.spacing(2),
      paddingRight:'10%',
      padding:'2vh',
      
  }
}));
NavBar.defaultProps = {
  isHamNav:false,
}
export default function NavBar(props) {
  const classes = useStyles();

  const preventDefault = event => event.preventDefault();
  
  const linkStyle = (props.isHamNav)?
  {
    display:'block',
    textAlign:'center',
    paddingTop: '30%',
    boxShadow: '0px 2px #888888',
  }:{
    paddingRight:'5%',
  };
  
  return (
    <Typography className={classes.root} >
      <Link href="#" onClick={preventDefault} style={linkStyle}>
        Link1 
      </Link>
      <Link href="#" onClick={preventDefault} style={linkStyle}>
        Link2
      </Link>
      <Link href="#" onClick={preventDefault} style={linkStyle}>
        Link3
      </Link>
    </Typography>
  );
}