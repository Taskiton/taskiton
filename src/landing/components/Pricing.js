import React from 'react';
import PricingCard from './PricingCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    pricing : {
        width: '100%', 
        textAlign: 'center', 
        height:'80vh',
        [theme.breakpoints.down('xs')]: {
            height: '100vh',
            }
        },
        planStyle: {
            fontSize: '3em',
            padding:5,
            [theme.breakpoints.down('xs')]: {
                fontSize: '2em',
            } 
            
        }
    
  }));

const Pricing = () => {

    // const planStyle = {
    //     fontSize: '3em',
    //     padding:5,
    //     [theme.breakpoints.down('xs')]: {
    //         fontSize: '2em',
    //     } 
        
    // }
    const classes = useStyles();

    return (
        <div className={classes.pricing}>
            <p className={classes.planStyle}><b>Choose a plan that is right for you</b></p>
            <div style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent:'center', flexWrap:'wrap', height:'100%'}}>
                <PricingCard title="Starter" desc="This is a Starter plan" price="Free" />
                <PricingCard title="Standard" desc="This is a Basic plan" price="$9.99" />
                <PricingCard title="Pro" desc="This is a Pro plan" price="$19.99" />
            </div>
        </div>
    );
}

export default Pricing;