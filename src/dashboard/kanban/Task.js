import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './task.css';

export default function Task(props) {

    const whileDragging = {
        backgroundColor: props => true ? "green" : "red"
    }
    const style = {
        backgroundColor: 'blue',
        fontSize: 18,
        // ...provided.draggableProps.style,
    };
    let handleClick = () => {
        alert("Task Details");
    };

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {
                
                (provided, snapshot) => (
                    <div>
                        {/* {snapshot.isDragging ? 'blue' : 'white'} */}
                    <div className="item" 
                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                        onClick={handleClick}
                    >
                        {props.task.content}
                    </div>
                    </div>
                )
            }
        </Draggable>
    );
}