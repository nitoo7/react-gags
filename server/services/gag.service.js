const gagModel = require('../schemas/gag.schema');

const fetchGagList = () => {

  var gg = new gagModel({
    gagId: "asssasaa",
    gagDesc: "asdadsadsa",
    gagImg: "asdsadsdsa",
    gagLikesCount: 3,
    gagLikesList: [],
    gagDisLikesCount: 4,
    gagDisLikesList: [],
    gagCommentsCount: 5,
    gagComments: []       ,
    gagCreatedAt: Date.now()
  });


  gg.save(function(err) {
    console.log("yyyyyyyyyyy", err)
    if (err) throw err;
  
    console.log('User saved successfully!');
  });
  // gagModel.findOne({}).exec().then((res) => {
  //   cnsole.log("HHH==>", res)
  // })
}

module.exports = {
  fetchGagList: fetchGagList
}