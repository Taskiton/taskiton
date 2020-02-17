import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard() {

    let columns = [
        { name: 'All tasks', stage: 1 },
        { name: 'My tasks', stage: 2 },
        { name: 'Completed', stage: 3 }
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState([]);
    const [draggedOverCol, setDraggedOverCol] = useState(0);

    useEffect(() => {
        setProject(projectList);
        setIsLoading(false);
    });

    //this is called when a Kanban card is dragged over a column (called by column)
    let handleOnDragEnter = (e, stageValue) => {
        setDraggedOverCol(stageValue);
    }

    //this is called when a Kanban card dropped over a column (called by card)
    let handleOnDragEnd = (e, projects) => {
        const updatedProjects = project.slice(0);
        updatedProjects.find((projectObject) => { return projectObject.name === projects.name; }).project_stage = draggedOverCol;
        setProject(updatedProjects);
    }

    if (isLoading) {
        return (<h3>Loading...</h3>);
    }

    return (
        <div>
            {columns.map((column) => {
                return (
                    <KanbanColumn
                        name={column.name}
                        stage={column.stage}
                        projects={project.filter((project) => { return parseInt(project.project_stage, 10) === column.stage; })}
                        onDragEnter={handleOnDragEnter}
                        onDragEnd={handleOnDragEnd}
                        key={column.stage}
                    />
                );
            })}
        </div>
    );

}

/*
 * Projects to be displayed on Kanban Board
 */
let projectList = [
    {
        name: 'Project 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1
    },
    {
        name: 'Project 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1
    },
    {
        name: 'Project 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1
    },
    {
        name: 'Project 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 2
    },
    {
        name: 'Project 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 3
    },
    {
        name: 'Project 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 3
    },
    {
        name: 'Project 7',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 4
    },
];
