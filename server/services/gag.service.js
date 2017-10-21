const gagModel = require('../models/gag.model');

const fetchGagList = () => {
  return gagModel.find({}, (err, gags) => {
    if (err) return Promise.reject(err)
    return gags;
  });
}

const fetchGagInfo = (id) => {
  return gagModel.findOne({gagId: id}, (err, gag) => {
    if(err) return Promise.reject(err)
    return gag;
  })
}

const postGag = (data) => {
  return gagModel.create(data).then(null, (err) => {
    return Promise.reject(err);
  })
}

const addComment = (data) => {
  return gagModel.findOne({gagId: data.gagId}, (err, gag) => {
    if(err) throw err;
    gag.gagComments.push(data.gagComment);
    gagModel.findOneAndUpdate({gagId: data.gagId}, {
      gagComments : gag.gagComments
    }).lean().exec()
    .then(null, function (err) {
      return Promise.reject(err);
    });
  })
}

const updateScores = (data) => {
  return gagModel.findOne({gagId: data.gagId}, (err, gag) => {
    if(err) return Promise.reject(err);
    if(data.scoreType === "like") {
      gag.gagLikesCount ++;
      gag.gagLikesList.push(data.userId);
      gagModel.findOneAndUpdate({gagId: data.gagId}, {
        gagLikesCount: gag.gagLikesCount,
        gagLikesList: gag.gagLikesList
      }).lean().exec()
      .then(null, function (err) {
        return Promise.reject(err);
      });      
    } else {
      gag.gagDisLikesCount ++;
      gag.gagDisLikesList.push(data.userId);
      gagModel.findOneAndUpdate({gagId: data.gagId}, {
        gagDisLikesCount: gag.gagDisLikesCount,
        gagDisLikesList: gag.gagDisLikesList
      }).lean().exec()
      .then(null, function (err) {
        return Promise.reject(err);
      });            
    }
  })
}

const deleteGag = (id) => {
  console.log("Delete==>", id)
}

module.exports = {
  fetchGagList: fetchGagList,
  fetchGagInfo: fetchGagInfo,
  postGag: postGag,
  addComment: addComment,
  updateScores: updateScores,
  deleteGag:deleteGag
}