import React from 'react';
import './column.css';
import Task from './Task';
import { Droppable } from "react-beautiful-dnd";


export default function Column(props) {

    let handleAddClick = () => {
        alert("Add an element");
    }

    return (
        <div>

            <div className="outerDiv">
                <h3>
                    {props.column.title!=='Archive'
                    ?<span onClick={handleAddClick} style={{cursor:"pointer"}}>+</span>
                    :<span></span>} 
                    {props.column.title}</h3>
                <Droppable droppableId={props.column.id} direction="vertical">
                    {
                        (provided, snapshot) => (
                            <div className="taskList" ref={provided.innerRef}
                            {...provided.droppableProps}>
                                {props.tasks.map((task,index) => <Task key={task.id} task={task} 
                                index={index}/>)}
                            {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </div>
        </div>
    );
}