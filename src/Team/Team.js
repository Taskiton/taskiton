import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root:{
      // maxWidth: '50%',
      marginTop: '8vh',
      paddingLeft:'20px',
      margin:'auto',
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      }
  },
  centerAlign:{
    textAlign:'center',
    display: 'block'
  },
  nameAlign: {
    marginTop: '2vh',
    textAlign:'center',
    display: 'block'
 
  },
  large: {
    marginTop:'2vh',
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down('xs')]: {
      marginTop:'5vh',
    }
  }

}));

export default function Team(props) {

    const classes = useStyles();
    return(
        <div>
        <Card className={classes.root}>
            <Avatar className={classes.large} alt="Remy Sharp" src={props.imgSrc} />
            <CardContent>
            <Typography className={classes.centerAlign} variant="h5" component="h2"> {props.name}
            </Typography>
            
            <Typography className={classes.nameAlign} color="textSecondary" variant="h7" component="h7"> Full Stack Developer
            </Typography>
            <Divider style={{ marginTop:20}} />
            
            </CardContent>
            <CardContent>
                <Box className={classes.centerAlign}>
                <IconButton color="primary" href={props.github}>
                <GitHubIcon style={{ color:'#F76C6C',fontSize: 40 }} />
                </IconButton>
                <IconButton color="primary" href={props.linkedin}>
                <LinkedInIcon style={{ color:'#F76C6C',fontSize: 50 }}/>
                </IconButton>
                </Box>   
            </CardContent>
        </Card>
        </div>
        
    );
}