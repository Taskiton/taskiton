import React, {useState, useEffect} from 'react';
import './teamList.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: "purple",
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginTop: "20px",
    },
}));

export default function TeamList() {

    let classes = useStyles();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        let url = "http://api.taskiton.wmdd.ca/userlist";
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*'
                , 'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 400) {
                alert("Error - refresh page and try again");
            }
            return response.json();
        })
            .then(data => {
                //console.log(data);
                setUsers(data);
            }).catch(function (err) {
                alert("Error - refresh page and try again");
                console.log(err)
            });
    }, [])

    return(
        <div>
            {users.map(user => <Avatar title={user.name} className={classes.avatar} key={user.user_id}>{(user.name).split(" ")[0][0]}{(user.name).split(" ")[1][0]}</Avatar>
                    )}
        </div>
    );
}