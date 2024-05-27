const Todo = require('../model/todo');

exports.createtodo = async (req, res) => {
    try {
       const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteTodo = async (req, res) => {
    try {
        console.log("delete",req.params);
        const  {id } = req.params;
        console.log("delete id",id);
        const todo = await Todo.findByIdAndDelete(id);
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("update params.id",req.params.id);
        console.log("update req.params ",req.params);
        if (!todo) {
            return res.status(404).json({ message: 'todo not found' });
        }
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getTodoById = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Todo.findById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
