const Router = require('express').Router();
const gag = require('../controllers/gag');
var multer = require('multer');

const mediaUploadHandler = multer({ dest: 'uploads/' });
// mediaUploadHandler handler as a middleware
function handleUpload(req, res, next) {
  mediaUploadHandler.any()(req, res, next);
}

Router.get('/list', gag.fetchGagList);
Router.get('/details/:id', gag.fetchGagInfo);
Router.put('/post', gag.postGag);
Router.post('/media/upload', handleUpload, gag.mediaUpload)
Router.put('/add/comment', gag.addComment);
Router.put('/update/score', gag.updateScores);
Router.get('/delete/:id', gag.deleteGag);

module.exports = Router;