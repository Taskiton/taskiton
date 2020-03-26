import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TeamMember from './Team'
import Typography from '@material-ui/core/Typography';
import yalcinPhoto from '../images/yalcin.jpg';
import arshPhoto from '../images/arsh.jpeg';

export default function TeamProfile() {
    // const classes = useStyles();

    return (
        <div >
        <Typography style={{textAlign:'center',marginTop:'3vh'}} variant="h2" component="h2"> The Team
        </Typography>
         <Grid container spacing={3}>
         <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={4}>
          <TeamMember name={"Yalcin Tatar"} imgSrc={yalcinPhoto} github={"https://github.com/yalcinos"} linkedin={"https://www.linkedin.com/in/yalcin-tatar/"}/>
        </Grid>
        <Grid item xs={12} sm={4}>
        <TeamMember name={"Arshdeep Singh"} imgSrc={arshPhoto} github={"https://github.com/Singh-Arshdeep"} linkedin={"https://www.linkedin.com/in/arshdeep-singh-uppal/"}/>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
        </div>
    );
}
