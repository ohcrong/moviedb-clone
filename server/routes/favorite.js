const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteCount', (req,res) => {
    
    //mongoDB에서 좋아요 숫자 가져오기
    Favorite.find({'movieId': req.body.movieId})
    .exec((err,info)=> {
        if (err) return res.status(400).send(err)
        //화면에 종아요 숫자 보내주기
        res.status(200).json({success : true, favoriteCount: info.length})
    })
    
})

router.post('/favorited', (req,res) => {
    
    //mongoDB에서 좋아요 list에 넣었는지 확인
    Favorite.find({'movieId': req.body.movieId, 'userFrom': req.body.userFrom})
    .exec((err,info)=> {
        if (err) return res.status(400).send(err)
        
        let result = false
        if (info.length !== 0) {
            result = true
        }
        
        res.status(200).json({success : true, favorited: result})
    })
    
})

router.post('/removeFromFavorite', (req,res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success : true})
    })
})

router.post('/addToFavorite', (req,res) => {
    //인스턴스 생성
    const favorite = new Favorite(req.body)
    
    favorite.save((err,doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success : true})
    })     
})

router.post('/getFavored', (req,res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec( (err,favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})
        })
})


module.exports = router;
