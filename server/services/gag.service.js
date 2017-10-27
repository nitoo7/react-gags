const gagModel = require('../models/gag.model');
const s3Helper = require('../handlers/s3.handler');
const s3Client = new s3Helper();
const bluebird = require('bluebird');
const fs = require('fs');
const Xerror = require('x-error');
const Hashids = require('hashids');

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
  const hashValue = data.gagDesc;
  const hashid = new Hashids(hashValue);
  console.log(hashid.encode(1, 2, 3));
  data.gagId = hashid.encode(1, 2, 3);
  return gagModel.create(data).then(null, (err) => {
    console.log("erro==>", err)
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

const mediaUpload = (file) => {
  const opts = {
    ACL: 'public-read',
    ContentType: file.mimetype
  };
  let readFile = bluebird.promisify(fs.readFile);
  let s3Url;
  return readFile(file.path)
  .then((file_buffer) => {
    var location = {
      domain: 'https://s3-ap-northeast-1.amazonaws.com/',
      bucket: 'gag-images',
      key: file.filename
    };    
    s3Url = 'https://s3-ap-northeast-1.amazonaws.com/gag-images/' + file.filename;
    switch (file.mimetype) {
      case 'image/jpeg':
        s3Url += '.jpg';
        location.key += '.jpg';
        break;
      case 'image/png':
        s3Url += '.png';
        location.key += '.png';
        break;
      case 'image/bmp':
        s3Url += '.bmp';
        location.key += '.bmp';
        break;
      default:
        return bluebird.reject(new xerror({
          safe: true,
          message: 'invalid content type, only jpg/png or bmp types are allowed'
        }));
      }    
    return s3Client.putObject({bucket: location.bucket, key: location.key}, file_buffer, opts);
  })
  .then(() => {
    fs.unlink(file.path);
    console.log("OLA==>", s3Url)
    return {
      s3Url: s3Url
    };
  })
  .catch((err) => {
    console.log("Erroor==>", err)
    fs.unlink(file.path);
    return bluebird.reject(new Xerror(err)
    .hc(422)
    .hr('Some error has occured, please try again!'));
  });
}

module.exports = {
  fetchGagList: fetchGagList,
  fetchGagInfo: fetchGagInfo,
  postGag: postGag,
  addComment: addComment,
  updateScores: updateScores,
  deleteGag:deleteGag,
  mediaUpload: mediaUpload
}