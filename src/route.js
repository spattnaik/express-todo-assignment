const express = require('express');
const router = express.Router();

const db = [
    {
        id: 1,
        title: 'Do Laundry',
        completed: true,
    }
];

router.get('/todos', (req, resp) => {
    resp.status(200).send({
        success: true,
        data: db
    })
});

router.post('/todos', (req, resp) => {
    const {success, message} = validateTodo(req.body);
    if(!success) {
        return resp.status(400).send({success, message});
    }
    const todo = {
        id: db.length + 1,
        title: req.body.title,
        completed: false,
    }
    db.push(todo);
    return resp.status(201).send({
        success: true,
        data: todo
    });
});

router.get('/todos/:id', (req, resp) => {
    const id = parseInt(req.params.id, 10);
    const todoFound = db.find((todo) => todo.id === id);
    if(todoFound) {
        return resp.status(200).send({
            success: true,
            data: todoFound,
        });
    }
    return resp.status(404).send({
        success: false,
        message: 'todo does not exist',
    });
});

router.put('/todos/:id', (req, resp) => {
    const id = parseInt(req.params.id, 10);
    const todoFound = db.find((todo) => todo.id === id)

    if (!todoFound) {
        return resp.status(404).send({
            success: false,
            message: 'todo not found',
        });
    }

    const {success, message} = validateTodo(req.body);
    if(!success) {
        return resp.status(400).send({success, message});
    }

    const completed = req.body.completed === 'true'? true: false;

    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        completed: completed,
    }

    console.log(todoFound);

    db.forEach(todo => {
        if(todo.id === id) {
            todo.title = updatedTodo.title;
            todo.completed = updatedTodo.completed;
        }
    });

    return resp.status(201).send({
        success: true,
        data: updatedTodo,
    });
});

router.delete('/todos/:id', (req, resp) => {
    const id = parseInt(req.params.id, 10);

    db.forEach((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1);
            return resp.status(200).send({
                success: true,
            });
        }
    });

    return resp.status(404).send({
        success: false,
        message: 'todo not found',
    });
});

const validateTodo = (todo) => {
    console.log(todo);
    if(!todo.title) {
        return {
          success: false,
          message: 'title is required'
        };
    }
    return {
        success: true,
        message:''
    };
}

module.exports = router;