'user strict';
var sql = require ('../config/db.connection');
var dbConnection = sql();
//Task object constructor
var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
}; 

Task.get_users = function (result) {
    dbConnection.query(`SELECT user_id, CONCAT(firstname, " ", lastname) name  FROM taskiton.users limit 8`, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Task.list_all_tasks = function (result) {
    dbConnection.query(`SELECT t.*, CONCAT(u.firstname, " ", u.lastname) user_name, c.column_id column_name FROM tasks t, users u, task_columns c 
    where t.user_id=u.user_id and t.column_id = c.id`, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {

            result(null, res);
        }
    });
};

Task.get_column_mapping = function (result) {
    dbConnection.query(`SELECT c.column_id, t.task_id FROM tasks t, task_columns c 
    where t.column_id = c.id order by column_id`, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Task.create_a_task = function (newTask, result) {
    dbConnection.query(`INSERT INTO tasks set task_id='${newTask.id}', task_name='${newTask.taskName}', task_details='${newTask.details}', due_date='${newTask.dueDate}', user_id=(select user_id from users where CONCAT(firstname, " ", lastname)='${newTask.assignedTo}'), column_id='${newTask.columnId}'`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, "success added");
        }
    });
};

Task.delete_a_task = function (task, result) {
    dbConnection.query(`delete from tasks where task_id = '${task.task_id}'`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, "success deleted");
        }
    });
};

Task.movetask_tonew_column = function (new_column, result) {
    dbConnection.query(`update tasks set column_id=${new_column.columnId} where task_id = '${new_column.taskId}'`, function (err, res) {
         if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, "success moved");
        }
    });
};

Task.update_a_task = function (task, result) {
    dbConnection.query(`update tasks set task_name='${task.taskName}', task_details='${task.details}', due_date='${task.dueDate}', user_id=(select user_id from users where CONCAT(LEFT(firstname,1), "", LEFT(lastname,1))='${task.assignedTo}') where task_id='${task.id}'`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, "success update");
        }
    });
};

module.exports = Task;