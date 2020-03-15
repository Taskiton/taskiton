import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './task.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: '#F76C6C',
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: 5,
    },
}));

export default function Task(props) {

    const whileDragging = {
        backgroundColor: props => true ? "green" : "red"
    }
    const style = {
        backgroundColor: 'blue',
        fontSize: 18,
        // ...provided.draggableProps.style,
    };
    const classes = useStyles();

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {
                (provided, snapshot) => (
                    <div>
                        <div className="item"
                            {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                            onClick={()=>{props.handleEditTask(props.task, props.columnId)}}
                        >
                            <Avatar className={classes.avatar}>{props.task.assignedTo}</Avatar>
                            {/* <Avatar className={classes.avatar} 
                            style={{backgroundColor:'purple'}}>A</Avatar> */}
                            <div className='taskName'>
                                <div>
                                    <span>{props.task.taskName}</span>
                                </div>
                                <div>
                                    <span style={{fontSize: '0.7em'}}>
                                        {props.task.dueDate?<span>Due:</span>:""}
                                        {(props.task.dueDate).toString()}</span>
                                </div>
                            </div>
                            <IconButton aria-label="More info" color="secondary">
                                <MoreHorizIcon />
                            </IconButton>
                        </div>
                    </div>
                )
            }
        </Draggable>
    );
}