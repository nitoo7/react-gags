const gagService = require('../services/gag.service');
const _ = require('lodash');

const fetchGagList = (req, res) => {
  gagService.fetchGagList().then((data) => {
    res.send(data);
  })
}

const fetchGagInfo = (req, res) => {
  gagService.fetchGagInfo(req.params.id).then((data) => {
    res.send(data);
  })
}

const postGag = (req, res) => {
  console.log("C===>", req.body)
  gagService.postGag(req.body).then((status) => {
    res.send({"status": "ok"});
  }, (err) => {
    res.send({"status": "failed"});
  })
}

const addComment = (req, res) => {
  console.log("AAAA")
  gagService.addComment(req.body).then((status) => {
    res.send({"status": "ok"});
  }, (err) => {
    res.send({"status": "failed"});
  })
}

const updateScores = (req, res) => {
  gagService.updateScores(req.body).then((status) => {
    if(status.error)
      res.send({"status": "failed"})
    res.send({"status": "ok"});    
  })
}

const deleteGag = (req, res) => {
  gagService.deleteGag(req.params.id).then((status) => {
    if(status.error)
      res.send({"status": "failed"})
    res.send({"status": "ok"});    
  })
}

const mediaUpload = (req, res) => {
  console.log("AAA", req.files[0])
  const file = req.files[0];
  if (_.isEmpty(file)) {
    return Promise.reject('error');
  } else {
    gagService.mediaUpload(file).then((data) => {
      res.send(data);
    })
  }
}

module.exports = {
  fetchGagList: fetchGagList,
  fetchGagInfo: fetchGagInfo,
  postGag: postGag,
  addComment: addComment,
  updateScores: updateScores,
  deleteGag: deleteGag,
  mediaUpload: mediaUpload 
}