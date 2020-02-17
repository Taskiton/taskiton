import React from "react";
import KanbanBoard from './KanbanBoard';

export default function Kanban() {

    const style = {
        'padding': '30px',
        'paddingTop': '5px',
    };

    return (
        <div style={style}>
            <KanbanBoard />
        </div>
    );

}


/**********************Reference***********************/
// https://codepen.io/raymondcao/pen/yoRpRM?editors=0010