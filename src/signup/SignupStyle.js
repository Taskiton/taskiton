import { makeStyles } from '@material-ui/core/styles';

export const signupPageStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        
    },
    formStyle:{
        display: 'block',
        textAlign: 'right',
        color: theme.palette.text.secondary,
        width: '100%',
    },
    signupImage:{
        width:'80%',
        margin:'auto',
        padding:theme.spacing(7),
        paddingTop:'6vh',
        [theme.breakpoints.between('xs','sm')]: {
            paddingTop:'15vh',
            padding:0,
            width:'100%'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
            padding:0
        }
    },
    signUpButton:{
        backgroundColor: '#F76C6C',
        width:'45%',
        height: '50px',
        display: 'inline',
        marginLeft:'auto',
        marginRight:'1vw',
        marginTop:'3vh',
        '&:hover': {
            backgroundColor: '#dc5a5a',
            borderColor: '#dc5a5a',
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: '#F76C6C',
            borderColor: '#F76C6C',
          },
    }
   
}));