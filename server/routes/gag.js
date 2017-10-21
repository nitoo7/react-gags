const Router = require('express').Router();
const gag = require('../controllers/gag');

Router.get('/list', gag.fetchGagList);
Router.get('/details/:id', gag.fetchGagInfo);
Router.put('/post', gag.postGag);
Router.put('/add/comment', gag.addComment);
Router.put('/update/score', gag.updateScores);
Router.get('/delete/:id', gag.deleteGag);

module.exports = Router;