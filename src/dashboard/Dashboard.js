import React from 'react';

export default function Dashboard() {
    const mydiv = {
        position: "absolute",
        zIndex: 9,
        backgroundColor: "#f1f1f1",
        textAlign: "center",
        border: "1px solid #d3d3d3",
    };
    const mydivheader = {
        padding: 10,
        cursor: "move",
        zIndex: 10,
        backgroundColor: "#2196F3",
        color: "#fff",
    }

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let handleMouseDown = (event) => {
        // get the mouse cursor position at startup:
        pos3 = event.clientX;
        pos4 = event.clientY;
        //document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    let elementDrag = (event) => {
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        // set the element's new position:
        console.log(event);
        event.target.style.top = (event.target.offsetTop - pos2) + "px";
        event.target.style.left = (event.target.offsetLeft - pos1) + "px";
    }


    return (
        <div>
            <div style={mydiv}>
                <div style={mydivheader} onMouseDown={handleMouseDown}>Click here to move</div>
                <p>Move</p>
                <p>this</p>
                <p>DIV</p>
            </div>
        </div>
    );
}