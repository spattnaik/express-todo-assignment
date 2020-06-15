const TodoItem = require('../models/todo-model');

const getList = async (req, resp, next) => {
    try {
        const includeDone = req.query.includeDone == 1? true: false;
        const filter = includeDone? {}: {done: false};
        const response = await TodoItem.find(filter);
        resp.status(200).send({
            success: true,
            data: response
        });
    } catch (err) {
        resp.status(500).send({
            success: false,
            message: 'Failed to get data'
        });
    }

}

const createItem = async (req, resp, next) => {
    const {success, message} = validateTodo(req.body);
    if(!success) {
        return resp.status(400).send({success, message});
    }
    const todo = {
        title: req.body.title,
        description: req.body.description,
        dueDate: new Date(req.body.dueDate),
        done: false,
    }
    const todoModel = new TodoItem(todo);
    try {
        const response = await todoModel.save();
        resp.status(201).send({
            success: true,
            data: response
        });
    } catch (err) {
        resp.status(500).send({
            success: false,
            message: 'Failed to save data'
        });
    }
    
}

const updateItem = async (req, resp, next) => {
    const id = req.params.id;

    const { success, message } = validateTodo(req.body);
    if (!success) {
        return resp.status(400).send({ success, message });
    }

    const updatedTodo = {
        title: req.body.title,
        description: req.body.description,
        dueDate: new Date(req.body.dueDate),
        done: req.body.done === 'true' ? true : false,
    }
    try {
        const response = await TodoItem.findOneAndUpdate({
            _id: id
        }, updatedTodo, { new: true });

        return resp.status(201).send({
            success: true,
            data: response,
        });
    } catch (err) {
        return resp.status(404).send({
            success: false,
            message: 'todo not found',
        });
    }
}

const getItem = async (req, resp, next) => {
    const id = req.params.id;
    try {
        const response = await TodoItem.findById(id);
        if (response) {
            return resp.status(200).send({
                success: true,
                data: response,
            });
        }
        return resp.status(404).send({
            success: false,
            message: 'todo does not exist',
        });
    } catch (err) {
        resp.status(500).send({
            success: false,
            message: 'Failed to get data'
        });
    }
}

const deleteItem = async (req, resp, next) => {
    const id = req.params.id;
    try {
        await TodoItem.findByIdAndRemove(id)
        return resp.status(200).send({
            success: true,
        });
    } catch(err) {
        return resp.status(404).send({
            success: false,
            message: 'todo not found',
        });
    }
}

const validateTodo = (todo) => {
    if(!todo.title) {
        return {
          success: false,
          message: 'title is required'
        };
    }
    if(todo.dueDate) {
        const dueDate = new Date(todo.dueDate);
        if(!(dueDate instanceof Date && !isNaN(dueDate))) {
            return {
                success: false,
                message: 'due date should be a proper date'
              };
        }
    }
    return {
        success: true,
        message:''
    };
}

module.exports = {
    getList,
    createItem,
    updateItem,
    getItem,
    deleteItem
}