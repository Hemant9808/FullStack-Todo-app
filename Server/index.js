const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = 4000;
const todoRouter = require("./route/todoRoutes");
const todoController = require('./controllers/todoControllers');
// Middleware to parse JSON bodies
app.use(express.json());



// MongoDB connection string
const mongoURI = 'mongodb+srv://hemant9808:ySEEecsHJArJfzfA@mydb.ovbqzxf.mongodb.net/mydb';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  app.use(cors())
  app.post('/api/todo', todoController.createtodo);
  app.get('/api/getTodos', todoController.getAllTodos);
  app.get('/api/getTodoById/:id', todoController.getTodoById);
  app.delete('/api/todos/:id', todoController.deleteTodo);
  app.post('/api/updateTodo/:id', todoController.updateTodo);
  
// Simple route for testing


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});