import express from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/users', (req, res) => {
    try {
        const users = UserController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.get('/users/:id', (req, res) => {
    try {
        const user = UserController.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post('/users', (req, res) => {
    try {
        const userModel = req.body;
        UserController.createUser(userModel);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.put('/users/:id', (req, res) => {
    try {
        const userModel = req.body;
        const user = UserController.updateUser(req.params.id, userModel);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.patch('/users/:id', (req, res) => {
    try {
        const userModel = req.body;
        const user = UserController.updateUser(req.params.id, userModel);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.delete('/users/:id', (req, res) => {
    try {
        const user = UserController.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default userRouter;
