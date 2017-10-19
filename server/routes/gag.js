const Router = require('express').Router();
const gag = require('../controllers/gag');

Router.get('/list', gag.fetchGagList);

module.exports = Router;