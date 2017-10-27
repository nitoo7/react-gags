const axios = require('axios');

export function setUserInfo(payload) {
  return {
    type: 'SET_USER_INFO',
    payload: payload
  }
}

export function getGagData(gagId) {
  return {
    type: 'GET_GAG_DATA',
    payload: {
      gagDesc: "gag...desc",
      gagImg: "https://img-9gag-fun.9cache.com/photo/aRj280y_700b.jpg",
      gagLikesCount: 5,
      gagLikesList: [],
      gagDisLikesCount: 6,
      gagDisLikesList: [],
      gagCommentsCount: 16,
      gagComments: []         
    }
  }
}

export function getGagList(filterType) {
  return {
    type: 'GET_GAG_LIST',
    payload: [
      {
        gagDesc: "gag...desc...1",
        gagImg: "https://img-9gag-fun.9cache.com/photo/aRj280y_700b.jpg",
        gagLikesCount: 5,
        gagLikesList: [],
        gagDisLikesCount: 6,
        gagDisLikesList: [],
        gagCommentsCount: 16       
      },
      {
        gagDesc: "gag...desc...2",
        gagImg: "https://img-9gag-fun.9cache.com/photo/aRj280y_700b.jpg",
        gagLikesCount: 5,
        gagLikesList: [],
        gagDisLikesCount: 6,
        gagDisLikesList: [],
        gagCommentsCount: 16       
      },
      {
        gagDesc: "gag...desc....3",
        gagImg: "https://img-9gag-fun.9cache.com/photo/aRj280y_700b.jpg",
        gagLikesCount: 5,
        gagLikesList: [],
        gagDisLikesCount: 6,
        gagDisLikesList: [],
        gagCommentsCount: 16       
      }             
    ]
  }
}

export function postGag(gagData) {
  console.log("ACTIONS==>", gagData)
  axios.put('http://localhost:8000/gag/post', gagData)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });  
}