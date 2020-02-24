import React, { useState } from 'react';
import initialData from './initialData';
import Column from './Column';
import { DragDropContext } from "react-beautiful-dnd";
import KanbanModal from '../Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import EditTaskForm from '../TaskForm/EditTaskForm';

export default function Kanban() {
    const [data, setData] = useState(initialData);

    let onDragEnd = (result) => {
        console.log(result);
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        //Task dropped at the same position
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return
        }

        if (source.droppableId === destination.droppableId) {
            console.log("Moving in the same column");
            const column = data.columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds,
            }

            setData(prevState => {
                return {
                    ...prevState,
                    columns: {
                        ...prevState.columns,
                        [newColumn.id]: newColumn,
                    }
                }
            }
            );
        } else if (destination !== null) {
            console.log("Moving to new column");
            const sourceColumn = data.columns[source.droppableId];
            const newSourceTaskIds = sourceColumn.taskIds;
            newSourceTaskIds.splice(source.index, 1);

            const destinationColumn = data.columns[destination.droppableId];
            const newDestinationTaskIds = destinationColumn.taskIds;
            newDestinationTaskIds.splice(destination.index, 0, draggableId);

            const newSourceColumn = {
                ...sourceColumn,
                taskIds: newSourceTaskIds
            }

            const newDestinationColumn = {
                ...destinationColumn,
                taskIds: newDestinationTaskIds
            }
            setData(prevState => {
                return {
                    ...prevState,
                    columns: {
                        ...prevState.columns,
                        [newSourceColumn.id]: newSourceColumn,
                        [newDestinationColumn.id]: newDestinationColumn,
                    }

                }
            });
        }
        //document.body.style.color = "black";
        //Call server to update here
    }

    let onDragStart = () => {
        //document.body.style.color = "red";
    }

    // let handleAddNewTask = () => {
    //     setOpen(true);
    // }

    /*****************/
    // Modal Handle
    const [modalStateOpen, setmodalStateOpen] = useState(false);

    const handleModalClose = () => {
        setmodalStateOpen(false);
    }
    /*****************/

    const [currentColumnId, setCurrentColumnId] = useState("");

    let handleAddNewTask = (colId) => {
        setmodalStateOpen(true);
        setCurrentColumnId(colId);
    }

    const [isItNewTask, setIsItNewTask] = useState(true);

    //Adding new task
    let handleAddNewTaskSubmit = (val, event) => {
        event.preventDefault();

        if(val.length<1) {
            setmodalStateOpen(false);
            return;
        }

        const allTasks = data.tasks;

        let numbOfTasks = Object.keys(allTasks).length;
        const newTaskId = 'task-' + (++numbOfTasks);
        const newTask = { id: newTaskId, content: val, assignedTo: 'AU' };
        allTasks[newTaskId] = newTask; // update the state

        //Updating the column
        const currentColumnTaskIds = data.columns[currentColumnId].taskIds;
        currentColumnTaskIds.splice(currentColumnTaskIds.length, 0, newTaskId);
        console.log(currentColumnTaskIds);

        //lets replace the whole column with new ids
        let updatedColumn = {
            ...data.columns[currentColumnId],
            taskIds: currentColumnTaskIds
        }

        //Updating state
        setData(prevState => {
            return {
                ...prevState,
                tasks:allTasks,
                columns: {
                    ...prevState.columns,
                    [currentColumnId]: updatedColumn,
                }
            }
        }
        );

        setmodalStateOpen(false);
    }

    //Handle Task Details
    let handleEditTask = (asssignedTo, taskDetails) => {
        setIsItNewTask(false);
        setmodalStateOpen(true);
        console.log(asssignedTo+" "+taskDetails);
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                {data.columnOrder.map((columnId) => {
                    let column = data.columns[columnId];
                    let tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                    return (
                        <Column key={column.id} column={column} tasks={tasks}
                            handleAddNewTask={() => { handleAddNewTask(column.id) }} 
                            handleEditTask={handleEditTask}/>
                    )
                })}
            </DragDropContext>
            <KanbanModal modalStateOpen={modalStateOpen} handleModalClose={handleModalClose}>
                {isItNewTask?<TaskForm handleAddNewTaskSubmit={handleAddNewTaskSubmit} />
                :<EditTaskForm/>}
            </KanbanModal>
        </div>
    );
}