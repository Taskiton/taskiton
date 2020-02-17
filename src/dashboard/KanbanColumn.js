import React, { useState } from 'react';
import KanbanCard from './KanbanCard';

export default function KanbanColumn(props) {

    const [mouseIsHovering, setMouseIsHovering] = useState(false);

    let generateKanbanCards = () => {
        return props.projects.slice(0).map((project) => {
            return (
                <KanbanCard
                    project={project}
                    key={project.name}
                    onDragEnd={props.onDragEnd}
                />
            );
        });
    }


    const columnStyle = {
        'display': 'inline-block',
        'verticalAlign': 'top',
        'marginRight': '5px',
        'marginBottom': '5px',
        'paddingLeft': '5px',
        'paddingTop': '0px',
        'width': '230px',
        'textAlign': 'center',
        'backgroundColor': 'red',
    };
    return (
        <div
            style={columnStyle}
            onDragEnter={(e) => { 
                setMouseIsHovering(true); 
                props.onDragEnter(e, props.stage); 
            }}
            onDragExit={(e) => { 
                setMouseIsHovering(false) 
            }}
        >
            <h4>{props.stage}. {props.name} ({props.projects.length})</h4>
            {generateKanbanCards()}
            <br />
        </div>);

}
