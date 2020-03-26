import { makeStyles } from '@material-ui/core/styles';

export const landingPageStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    nav: {
        padding: theme.spacing(2),
        textAlign: 'right',
        color: theme.palette.text.secondary,
        height: '8vh',
        [theme.breakpoints.down('xs')]: {
            height: '6vh',
        }
    },
    promo1: {
        height: '78vh',
        [theme.breakpoints.down('xs')]: {
            // height: '60vh',
        }
    },
    promo2: {
        height: '100vh',
        [theme.breakpoints.down('xs')]: {
            height: '50vh',
        }
    },
    landingPhoto:{
        width:'80%',
        height: '95%',
        margin:'auto',
        padding:theme.spacing(7),
        paddingTop:'6vh',
        [theme.breakpoints.between('xs','sm')]: {
            paddingTop:'15vh',
            padding:0,
            width:'100%'
        },
        [theme.breakpoints.down('xs')]: {
            padding:0
        }

    },
    landingMotto:{
        paddingTop:'25vh',
        width:'50%',
        margin:'auto',
        [theme.breakpoints.down('xs')]: {
            paddingTop:'10vh',
            width:'80%',
            textAlign:'center',
            marginTop: '20%'
        }
    },
    pricing: {
        padding:10,
    }
}));
