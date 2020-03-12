import React, { useState, useEffect } from 'react';
import { initialData } from './HandleKanbanData';
import Column from './Column';
import { DragDropContext } from "react-beautiful-dnd";
import KanbanModal from '../Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import EditTaskForm from '../TaskForm/EditTaskForm';

export default function Kanban() {

    const [data, setData] = useState(null);
    //Fetch initial data
    useEffect(() => {

        let promise =fetchInitialData();

        promise.then( result => {
            setData(initialData);
        });
    }, []);

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

    /*************************************************************/
    /*************************************************************/
    // Modal Handle
    const [modalStateOpen, setmodalStateOpen] = useState(false);

    const handleModalClose = () => {
        setmodalStateOpen(false);
    }
    /*************************************************************/
    //Could have named the following states better:
    const [currentColumnId, setCurrentColumnId] = useState("");

    const [isItNewTask, setIsItNewTask] = useState(true);

    /*************************************************************/
    /*************************************************************/
    //Adding new task

    let handleAddNewTask = (colId) => {
        setIsItNewTask(true);
        setmodalStateOpen(true);
        setCurrentColumnId(colId);
    }

    let handleAddNewTaskSubmit = (val, event) => {
        event.preventDefault();
        if (val.taskName.length < 1) {
            setmodalStateOpen(false);
            return;
        }

        const allTasks = data.tasks;

        let numbOfTasks = Object.keys(allTasks).length;
        const newTaskId = 'task-' + (++((Array.from(Object.keys(allTasks))[numbOfTasks - 1]).split("-")[1]));
        const newTask = {
            id: newTaskId,
            taskName: val.taskName,
            details: val.taskDetails,
            assignedTo: val.assignedTo,
            dueDate: val.dueDate,
        };
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
                tasks: allTasks,
                columns: {
                    ...prevState.columns,
                    [currentColumnId]: updatedColumn,
                }
            }
        }
        );

        setmodalStateOpen(false);
    }
    /*************************************************************/

    /*************************************************************/
    /*************************************************************/

    const [editTaskDetails, setEditTaskDetails] = useState("");
    const [editColumnId, setEditColumnId] = useState("");

    //Edit Task Details
    let handleEditTask = (task, columnId) => {
        setIsItNewTask(false);
        setmodalStateOpen(true);
        setEditTaskDetails(task);
        setEditColumnId(columnId);
    }

    //Editing task details
    let handleEditTaskSubmit = (task, event, _taskId) => {
        event.preventDefault();

        const allTasks = data.tasks;
        allTasks[_taskId] = {
            id: _taskId,
            taskName: task.taskName,
            details: task.taskDetails,
            assignedTo: task.assignedTo,
            dueDate: task.dueDate
        }

        setData(prevState => {
            return {
                ...prevState,
                tasks: allTasks,
            }
        });

        setmodalStateOpen(false);
    }

    //Delete the card
    let handleEditNewTaskDelete = (_taskId) => {
        const allTasks = data.tasks;
        delete allTasks[_taskId];

        const currentColumnTaskIds = data.columns[editColumnId].taskIds;
        const indexToDelete = currentColumnTaskIds.indexOf(_taskId);
        currentColumnTaskIds.splice(indexToDelete, 1);

        const newColumn = {
            ...data.columns[editColumnId],
            taskIds: currentColumnTaskIds
        }

        setData(prevState => {
            return {
                ...prevState,
                tasks: allTasks,
                columns: {
                    ...prevState.columns,
                    [editColumnId]: newColumn,
                }
            }
        });
        setmodalStateOpen(false);
    }

    let fetchInitialData = () => {
        return new Promise((resolve, reject) => {
            const url = 'http://localhost:3000/tasks';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    Object.keys(data).map(task => {
                        initialData.tasks = {
                            ...initialData.tasks,
                            [task] : {
                                id: data[task].task_id,
                                taskName: data[task].task_name,
                                assignedTo: data[task].user_name.charAt(0),
                                details: data[task].task_details,
                                dueDate: data[task].due_date
                            }
                        }
                    })
                    fetch("http://localhost:3000/columnmapping")
                    .then(response => response.json())
                    .then(data => {
                        if (data)
                            resolve("Promise resolved successfully");
                        else
                            reject(Error("Promise rejected"));
                        Object.keys(data).map(column=>{
                            initialData.columns = {
                                ...initialData.columns,
                                [column] : {
                                    ...initialData.columns[column],
                                    taskIds : data[column]
                                }
                            }
                        })   
                    })
                    
                    console.log(initialData);
                })

        })
    }

    /*************************************************************/
    if (!data) {
        return <div />
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
                            handleEditTask={handleEditTask} />
                    )
                })}
            </DragDropContext>
            <KanbanModal modalStateOpen={modalStateOpen} handleModalClose={handleModalClose}>
                {isItNewTask ? <TaskForm handleAddNewTaskSubmit={handleAddNewTaskSubmit} />
                    : <EditTaskForm
                        task={editTaskDetails}
                        handleEditTaskSubmit={handleEditTaskSubmit}
                        handleEditNewTaskDelete={handleEditNewTaskDelete}
                    />}
            </KanbanModal>
        </div>
    );
}

