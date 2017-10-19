const Router = require('express').Router();
const user = require('../controllers/user');

Router.get('/login', user.loginUser);
Router.get('/logout', user.logoutUser);

module.exports = Router;