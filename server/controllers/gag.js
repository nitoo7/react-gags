const gagService = require('../services/gag.service');

const fetchGagList = (req, res) => {
  return gagService.fetchGagList()
}

const fetchGagInfo = (req, res) => {

}

const postGag = (req, res) => {

}

const addComment = (req, res) => {

}

const updateScores = (req, res) => {

}

const deleteGag = (req, res) => {

}

module.exports = {
  fetchGagList: fetchGagList,
  fetchGagInfo: fetchGagInfo,
  postGag: postGag,
  addComment: addComment,
  updateScores: updateScores,
  deleteGag:deleteGag
}