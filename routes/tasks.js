const express = require('express');
const { response } = require('../app');
const router = express.Router();
const pool = require('../database');
/* 
    BASE URL /tasks
    GET / - Get all tasks
    POST / - Create a new task
    GET /:id - Get a task by id
    PUT /:id - Update a task by id
    DELETE /:id - Delete a task by id
*/
router.get('/', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM tasks')
        .then(([rows, fields]) => {
              res.render('tasks.njk', {
                tasks: rows,
                title: 'Tasks',
                layout: 'layout.njk'
              });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                tasks: {
                    error: 'Error getting tasks'
                }
            })
        });
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (isNaN(req.params.id)) {
        res.status(400).json({
            task: {
                error: 'Bad request'
            }
        });
    }
    await pool.promise()
        .query('SELECT * FROM tasks WHERE id = ?', [id])
        .then(([rows, fields]) => {
            res.json({
                task: {
                    data: rows
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                task: {
                    error: 'Error getting tasks'
                }
            })
        });
});

router.get('/:id/delete', async (req, res, next) => {
    const id = req.params.id;
    if (isNaN(req.params.id)) {
        res.status(400).json({
            task: { error: "Bad request" }
        });
    }
    await pool.promise()
    .query('DELETE FROM tasks WHERE id = ?', [id])
    .then((response) => {
        res.redirect("/tasks");
    });
}); 

router.get('/:id/complete', async (req, res, next) => {
    const id = req.params.id;
    await pool.promise()
    .query('UPDATE tasks SET completed = 1 WHERE id = ?;', [id])
    .then((response) => {
        res.redirect("/tasks");
    });
});

router.get('/:id/uncomplete', async (req, res, next) => {
    const id = req.params.id;
    await pool.promise()
    .query('UPDATE tasks SET completed = 0 WHERE id = ?;', [id])
    .then((response) => {
        res.redirect("/tasks");
    });
});

router.post('/', async (req, res, next) => {
    // { "task": "koda post" }
    const task = req.body.task;
    if (task.length < 3) {
        res.status(400).json({
            task: {
                error: 'Task must have atleast 3 characters'
            }
        })
    }
    else {

    await pool.promise()
    .query('INSERT INTO tasks (task) VALUES (?)', [task])
    .then((response) => {
        console.log(response);
        if (response[0].affectedRows == 1) {
            res.redirect("/tasks");
        }
        else {
            res.status(400).json({
                task: {
                    error: 'Invalid Task'
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            task: {
                error: 'Error creating new task'
            }
        })
    });
    }
    
    // res.json(req.body);

});


module.exports = router;



/*

    await pool
    .promise()
    .query('SELECT * FROM users')
    .then(([rows, fields]) => {
        res.json({
            data: rows,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: 'Database error',
        });
    });

    */