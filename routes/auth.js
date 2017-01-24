var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();
var checkProfile = require('../query.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup/', function(req, res, next){
  if (req.body.email.length < 5){
    next (new Error('Invalid Email'))
  } else if (req.body.password.length < 8){
    console.log('password too short')
    next (new Error('Password must be at least 8 characters'))
  } else {
    knex('users').insert({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    .then((user)=>{
      res.json(user)
    })
  }
})

router.post('/login/', function(req, res, next){
  return knex('users').select().where('email', req.body.email).first()
  .then((user)=>{
    if (checkProfile.decrypt(req.body.password, user.password)==true){
      res.json(user)
    } else {
      next (new Error('invalid password'))
    };
  })

})

module.exports = router;
