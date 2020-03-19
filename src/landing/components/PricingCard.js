import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 270,
        textAlign: "center",
        padding:30,
        margin:10,
        top: '3vh',
        [theme.breakpoints.down('xs')]: {
            width:'100%',
            top: '1vh',
        }
    },
    title: {
        fontSize: '2em',
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
        }
    },
    pos: {
    },
    actionBtn: {
        margin: 'auto',
        backgroundColor: '#F76C6C',
        color: 'white',
        width: '100%',
        fontWeight: '900',
        "&:hover": {
            color: 'black',
        },
    }
}));


function PricingCard(props) {
    let classes = useStyles();
    let history = useHistory();
    const context = useContext(AuthContext);
    const {isAuthenticated} = context;

    let handleClick = () => {
        if(isAuthenticated) {
            history.push("/dashboard");
        } else {
            history.push("/signup");
        }
    }

    return (
        <div style={{height:'100%'}}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <p className={classes.title}>{props.title}</p>
                    <p>{props.desc}</p>
                    <h2>{props.price}</h2>
                    <p>per user/month</p>
                </CardContent>
                <CardActions >
                    <Button className={classes.actionBtn} onClick={handleClick}><b>Try it</b></Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default PricingCard;