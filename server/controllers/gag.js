const gagService = require('../services/gag.service');

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

module.exports = {
  fetchGagList: fetchGagList,
  fetchGagInfo: fetchGagInfo,
  postGag: postGag,
  addComment: addComment,
  updateScores: updateScores,
  deleteGag:deleteGag
}