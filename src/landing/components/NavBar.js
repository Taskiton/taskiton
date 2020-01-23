/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
      marginLeft: theme.spacing(2),
      paddingRight:"10%",
      padding:"2vh",
  },
  link: {
      paddingRight:"5%",
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const preventDefault = event => event.preventDefault();

  return (
    <Typography className={classes.root} >
      <Link href="#" onClick={preventDefault} className={classes.link}>
        Link1
      </Link>
      <Link href="#" onClick={preventDefault} className={classes.link}>
        Link2
      </Link>
      <Link href="#" onClick={preventDefault} className={classes.link}>
        Link3
      </Link>
    </Typography>
  );
}