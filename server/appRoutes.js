'use strict';
module.exports = function (app) {
    var taskList = require('./dashboard/dashboardController');

/**
 * @api {get} http://api.taskiton.wmdd.ca/userlist List Users with user_id
 * @apiGroup Users
 * @apiSuccess {Number} id User_id
 * @apiSuccess {String} name Firstname and Lastname of the users
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "user_id": 60,
        "name": "Arsh Deep"
    }
 */
    app.route('/userlist')
        .get(taskList.get_users);

/**
 * @api {get} http://api.taskiton.wmdd.ca/userlist List All Tasks
 * @apiGroup Tasks
 * @apiSuccess {Number} task_id Task_id
 * @apiSuccess {String} task_name Task Name
 * @apiSuccess {String} task_details Task Details
 * @apiSuccess {date} due_date Due Date
 * @apiSuccess {date} due_time Due Time
 * @apiSuccess {Number} user_id User_id
 * @apiSuccess {Number} column_id Column Id
 * @apiSuccess {String} user_name First name and LastName of user
 * @apiSuccess {String} column_name Column Name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "task-24-1031628": {
        "id": 89,
        "task_id": "task-24-1031628",
        "task_name": "Presentation",
        "task_details": "dnasjkdkn",
        "due_date": "3/28/2020",
        "due_time": null,
        "user_id": 59,
        "column_id": 3,
        "user_name": "Yalcin Tatar",
        "column_name": "column-3"
        }
    }
 */

 /** POST
 * @api {post} http://api.taskiton.wmdd.ca/tasks Create a task
 * @apiGroup Tasks
 * @apiParam {Number} id Task id
 * @apiParam {String} TaskName Task's name
 * @apiParam {String} details Task's details
 * @apiParam {Date} dueDate Task's due date
 * @apiParam {String} assignedTo Assigned User 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 * "success":"success added"
 * }

 */

  /** POST
 * @api {DELETE} http://api.taskiton.wmdd.ca/tasks Delete a task
 * @apiGroup Tasks
 * @apiParam {Number} task_id Task id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 * "success":"success deleted"
 * }

 */
    app.route('/tasks')
        .get(taskList.list_all_tasks)
        .post(taskList.create_a_task)
        .delete(taskList.delete_a_task);

/**
 * @api {post} http://api.taskiton.wmdd.ca/user Update a task
 * @apiGroup Tasks
 * @apiParam {String} taskName Task's name
 * @apiParam {String} details Task's detail
 * @apiParam {String} dueDate Task's dueDate
 * @apiParam {String} assignedTo Assigned User
 * @apiParam {Number} task_id Task ID 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 * "code":200,
 * "success":"success update"
 * }

 */
    app.route('/updatetask')
        .post(taskList.update_a_task);

        /**
 * @api {get} http://api.taskiton.wmdd.ca/columnmapping List Tasks that has specific status().
 * @apiGroup Tasks
 * @apiSuccess {String} column_id (Column-1 is New Task. Column-2 is in progress. Column-3 is Done)
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        {
    "column-1": [
        "task-26-122861"
    ],
    "column-2": [
        "task-24-10540227"
    ],
    "column-3": [
        "task-23-225424816",
        "task-24-1031628",
        "task-26-1228771"
    ]
        }
    }
 */

    app.route('/columnmapping')
        .get(taskList.get_column_mapping);

    app.route('/movetask')
        .post(taskList.movetask_tonew_column);
};