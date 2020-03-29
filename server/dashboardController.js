'use strict';

var Task = require('./dashboardModel.js');

exports.get_users = function (req, res) {

  //Should have move the logic out of controller
  Task.get_users(function (err, task) {
    if (err) {
      res.send(err);
    }
    res.send(task);
  });
};

exports.list_all_tasks = function (req, res) {

  //Should have move the logic out of controller
  Task.list_all_tasks(function (err, task) {
    if (err) {
      res.send(err);
    }
    let data = {};
    for(let i=0; i<task.length; i++) {
      let task_id = task[i].task_id;
      data[task_id] = {
        ...task[i],
      }
    }
    res.send(data);
  });
};

exports.get_column_mapping = function (req, res) {

  Task.get_column_mapping(function (err, col) {
    if (err) {
      res.send(err);
    }
    let data = {};
    for(let i=0; i<col.length; i++) {
      let column_id = col[i].column_id;
      if(data[column_id]) {
        data[column_id] = [...data[column_id], col[i].task_id]
      } else {
        data[column_id] = [col[i].task_id]
      }
    }
    res.send(data);
  });
};

exports.create_a_task = function (req, res) {
  var new_task = req.body;
  //handles null error 
  if (!new_task.id) {
    res.status(400).send({ error: true, message: 'Please provide info' });
  }

  else {
    Task.create_a_task(new_task, function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  }
};

exports.movetask_tonew_column = function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers: Content-Type');
  var new_column = req.body;
  //handles null error 
  if (!new_column.taskId || !new_column.columnId) {
    res.status(400).send({ error: true, message: 'please try again' });
  }

  else { 
    Task.movetask_tonew_column(new_column, function (err, _status) {
      if (err) {
        res.send(err);
      }
      res.json({status:_status});
    });
  }
};

exports.delete_a_task = function (req, res) {
  let task = req.body;
  //handles null error 
  if (!task.task_id) {
    res.status(400).send({ error: true, message: 'Cannot delete the task' });
  }

  else {
    Task.delete_a_task(task, function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  }
};

exports.update_a_task = function (req, res) {
  var task = req.body;
  console.log(task.id);
  //handles null error 
  if (!task.id) {
    res.status(400).send({ error: true, message: 'update failed' });
  }
  else {
    Task.update_a_task(task, function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  }
};
