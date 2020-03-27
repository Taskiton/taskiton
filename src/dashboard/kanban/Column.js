import React from 'react';
import './column.css';
import Task from './Task';
import { Droppable } from "react-beautiful-dnd";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Column(props) {

    return (
        <div>
            <div className="colDiv">
                <p className="colTitle"> 
                    {props.column.title}
                    {props.column.title=='New Tasks'
                    ?<span onClick={props.handleAddNewTask} style={{cursor:"pointer"}}>
                        <IconButton aria-label="Add"  style={{padding:0, position:"absolute", marginLeft:5}}>
                            <AddCircleIcon/>
                        </IconButton>
                    </span>
                    :<span></span>}</p> 

                <Droppable droppableId={props.column.id} direction="vertical">
                    {
                        (provided, snapshot) => (
                            <div className="taskList" ref={provided.innerRef}
                            {...provided.droppableProps}>
                                {props.tasks.map((task,index) => <Task 
                                key={task.id} task={task} 
                                handleEditTask = {props.handleEditTask}
                                index={index}
                                columnId={props.column.id}/>)}
                            {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </div>
        </div>
    );
}