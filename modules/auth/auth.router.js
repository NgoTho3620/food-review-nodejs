const express = require('express');
const Router = express.Router();
const AuthController = require('./auth.controller');
const {isAuth} = require('../../middlewares/isAuth');
// api/auth/signup
Router.post('/signup', async (req, res) => {
    try {
        //console.log(req.body);
        const { email, name, password } = req.body;
        //console.log(email,name,password);
        const newUser = await AuthController
            .createUser({ password, name, email });
        
        res.send({ success: 1, data: newUser });
    } catch (err) {
        res.status(500).send({ success: 0, message: err.message });
    }
});

// api/auth/login
Router.post('/login', async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const foundUser = await AuthController
            .login({ email, name, password });

        res.send({ success: 1, data: foundUser });
    } catch (err) {
        res.status(500).send({ success: 0, message: err.message });
    }
});

Router.get('/user',isAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send({ success: 1, data: user });
    } catch (err) {
        res.status(500).send({ success: 0, message: err.message });
    }
});

module.exports = Router;