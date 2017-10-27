const express = require('express');
const router = express.Router();
const User = require('../db').User;

let userCache = {}; 

function checkToSeeIfCacheIsTooBig(){
    if(Object.keys(userCache) > 10){
        userCache = {};
    } 
}


router.get('/', (req, res, next) => {
    User.findAll()
    .then(users => {
        res.json(users);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
    if(userCache[Number(req.params.id)]){
        res.json(userCache[Number(req.params.id)]); 
        checkToSeeIfCacheIsTooBig();
    } else {
        User.findById(Number(req.params.id))
        .then(user => {
            userCache[Number(req.params.id)] = user;
            res.json(user);
        })
        .catch(next);
    }
   
})

router.post('/', (req, res, next) => {
    User.create(req.body)
    .then(user => {
        res.json(user);
    })
    .catch(next); 
})

router.put('/:id', (req, res, next) => {
    let userId = Number(req.params.id);
    User.findById(userId)
    .then(user => {
        return user.update(req.body);
    })
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(next); 
})

router.delete('/:id', (req, res, next) => {
    let userId = Number(req.params.id);
    User.findById(userId)
    .then(user => {
        return user.destroy();
    })
    .then(destroyedUser => {
        res.json(destroyedUser); 
    })
    .catch(next); 
})


module.exports = router;