import React, { useState, useEffect, useContext, newContext } from "react";
import { initialData } from "./HandleKanbanData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanModal from "../Modal/Modal";
import TaskForm from "../TaskForm/TaskForm";
import EditTaskForm from "../TaskForm/EditTaskForm";

export default function Kanban() {
  // const newContext = React.createContext({ color: 'black' });

  const [data, setData] = useState(null);
  //Fetch initial data
  useEffect(() => {
    let promise = fetchInitialData();

    promise.then((result) => {
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
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      //console.log("Moving in the same column");
      const column = data.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      setData((prevState) => {
        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newColumn.id]: newColumn,
          },
        };
      });
    } else if (destination !== null) {
      //console.log("Moving to new column");
      const sourceColumn = data.columns[source.droppableId];
      const newSourceTaskIds = sourceColumn.taskIds;
      newSourceTaskIds.splice(source.index, 1);

      const destinationColumn = data.columns[destination.droppableId];
      const newDestinationTaskIds = destinationColumn.taskIds;
      newDestinationTaskIds.splice(destination.index, 0, draggableId);

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      };
      setData((prevState) => {
        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newSourceColumn.id]: newSourceColumn,
            [newDestinationColumn.id]: newDestinationColumn,
          },
        };
      });
      moveTaskToNewColumn(draggableId, destination);
    }
    //document.body.style.color = "black";
    //Call server to update here
  };

  let onDragStart = () => {
    //document.body.style.color = "red";
  };

  // let handleAddNewTask = () => {
  //     setOpen(true);
  // }

  let moveTaskToNewColumn = (_taskId, _columnId) => {
    var data = {
      taskId: _taskId,
      columnId: _columnId.droppableId.split("-")[1],
    };
    let url = "https://server.taskiton.wmdd.ca/movetask";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.status >= 400) {
          //alert("Error - refresh page and try moving again");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(function (err) {
        //alert("Error - refresh page and try moving again");
        console.log(err);
      });
  };

  /*************************************************************/
  /*************************************************************/
  // Modal Handle
  const [modalStateOpen, setmodalStateOpen] = useState(false);

  const handleModalClose = () => {
    setmodalStateOpen(false);
  };
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
  };

  let handleAddNewTaskSubmit = (val, event) => {
    event.preventDefault();
    if (val.taskName.length < 1) {
      setmodalStateOpen(false);
      return;
    }

    const allTasks = data.tasks;

    let numbOfTasks = Object.keys(allTasks).length;
    let newTaskId = "";
    var date = new Date();
    var hrs = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var milisecs = date.getMilliseconds();
    if (numbOfTasks > 0) {
      newTaskId =
        "task-" +
        ++Array.from(Object.keys(allTasks))[numbOfTasks - 1].split("-")[1] +
        "-" +
        hrs +
        mins +
        secs +
        milisecs;
    } else {
      newTaskId = "task-" + hrs + "-" + hrs + mins + secs + milisecs;
    }

    let assignedUser = "";
    if (val.assignedTo)
      assignedUser =
        val.assignedTo.split(" ")[0].split("")[0] +
        val.assignedTo.split(" ")[1].split("")[0];
    const newTask = {
      id: newTaskId,
      taskName: val.taskName,
      details: val.taskDetails,
      assignedTo: assignedUser,
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
      taskIds: currentColumnTaskIds,
    };

    //Updating state
    setData((prevState) => {
      return {
        ...prevState,
        tasks: allTasks,
        columns: {
          ...prevState.columns,
          [currentColumnId]: updatedColumn,
        },
      };
    });
    addNewTaskToDb(newTask, val.assignedTo);
    setmodalStateOpen(false);
  };

  let addNewTaskToDb = (newTask, assignedUser) => {
    var data = {
      ...newTask,
      assignedTo: assignedUser,
      columnId: 1,
    };
    console.log(data);
    let url = "https://server.taskiton.wmdd.ca/tasks";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.status >= 400) {
          alert("Error - refresh page and try again");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(function (err) {
        alert("Error - refresh page and try again");
        console.log(err);
      });
  };
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
  };

  //Editing task details
  let handleEditTaskSubmit = (task, event, _taskId) => {
    event.preventDefault();

    const allTasks = data.tasks;
    allTasks[_taskId] = {
      id: _taskId,
      taskName: task.taskName,
      details: task.taskDetails,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
    };

    setData((prevState) => {
      return {
        ...prevState,
        tasks: allTasks,
      };
    });

    setmodalStateOpen(false);
    editTaskFromDb(allTasks[_taskId]);
  };

  let editTaskFromDb = (_task) => {
    let url = "https://server.taskiton.wmdd.ca/updatetask";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_task),
    })
      .then((response) => {
        console.log(response);
        if (response.status >= 400) {
          alert("Error - refresh page and try again");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(function (err) {
        alert("Error - refresh page and try again");
        console.log(err);
      });
  };

  /*************************************************************/
  /*************************************************************/
  //Delete the card
  let handleEditNewTaskDelete = (_taskId) => {
    const allTasks = data.tasks;
    delete allTasks[_taskId];

    const currentColumnTaskIds = data.columns[editColumnId].taskIds;
    const indexToDelete = currentColumnTaskIds.indexOf(_taskId);
    currentColumnTaskIds.splice(indexToDelete, 1);

    const newColumn = {
      ...data.columns[editColumnId],
      taskIds: currentColumnTaskIds,
    };

    setData((prevState) => {
      return {
        ...prevState,
        tasks: allTasks,
        columns: {
          ...prevState.columns,
          [editColumnId]: newColumn,
        },
      };
    });
    setmodalStateOpen(false);
    deleteTaskFromDb(_taskId);
  };

  let deleteTaskFromDb = (_taskId) => {
    var data = {
      task_id: _taskId,
    };
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = "https://server.taskiton.wmdd.ca/tasks";
    fetch(proxyurl + url, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.status >= 400) {
          alert("Error - refresh page and try again");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(function (err) {
        alert("Error - refresh page and try again");
        console.log(err);
      });
  };

  /*************************************************************/
  /*************************************************************/
  let fetchInitialData = () => {
    return new Promise((resolve, reject) => {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://server.taskiton.wmdd.ca/tasks";
      fetch(proxyurl + url, {
        "X-Requested-With": "XMLHttpRequest",
      })
        .then((response) => response.json())
        .then((data) => {
          Object.keys(data).map((task) => {
            initialData.tasks = {
              ...initialData.tasks,
              [task]: {
                id: data[task].task_id,
                taskName: data[task].task_name,
                assignedTo:
                  data[task].user_name.split(" ")[0][0] +
                  data[task].user_name.split(" ")[1][0],
                details: data[task].task_details,
                dueDate: data[task].due_date,
              },
            };
          });
          fetch("https://server.taskiton.wmdd.ca/columnmapping")
            .then((response) => response.json())
            .then((data) => {
              Object.keys(data).map((column) => {
                initialData.columns = {
                  ...initialData.columns,
                  [column]: {
                    ...initialData.columns[column],
                    taskIds: data[column],
                  },
                };
                //console.log(column);
              });
              if (data) resolve("Promise resolved successfully");
              else reject(Error("Promise rejected"));
            });
          //console.log(initialData);
        });
    });
  };

  /*************************************************************/
  /*************************************************************/
  let closeModal = () => {
    setmodalStateOpen(false);
  };
  /*************************************************************/
  /*************************************************************/
  /*************************************************************/
  if (!data) {
    return <div />;
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {data.columnOrder.map((columnId) => {
          let column = data.columns[columnId];
          let tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              handleAddNewTask={() => {
                handleAddNewTask(column.id);
              }}
              handleEditTask={handleEditTask}
            />
          );
        })}
      </DragDropContext>
      <KanbanModal
        modalStateOpen={modalStateOpen}
        handleModalClose={handleModalClose}
      >
        {isItNewTask ? (
          <TaskForm
            handleAddNewTaskSubmit={handleAddNewTaskSubmit}
            closeModal={closeModal}
          />
        ) : (
          <EditTaskForm
            task={editTaskDetails}
            handleEditTaskSubmit={handleEditTaskSubmit}
            handleEditNewTaskDelete={handleEditNewTaskDelete}
            closeModal={closeModal}
          />
        )}
      </KanbanModal>
    </div>
  );
}
