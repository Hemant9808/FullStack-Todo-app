const express = require('express');
const router = express.Router();
const todoControllers = require('../controllers/todoControllers');
router.post('/', todoControllers.createtodo);