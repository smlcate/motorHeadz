require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var crypto = require('crypto');
var bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(expressJWT({ secret: 's383838' }))

exports.signUp = function(req, res, next) {

  console.log(req.body.frm.email, req.body.frm.password);

  var email = req.body.frm.email;
  var password = req.body.frm.password;

  var hash = bcrypt.hashSync(req.body.frm.password, bcrypt.genSaltSync(10));

  var user = {
    email: email,
    password: hash,
    type: 'normal'
  }

  console.log(user)

  knex('users')
  .where({'email':user.email})
  .then(function(data) {
    console.log(data);
    if(data.length) {
      res.send('exists')
      return;
    } else {

      knex('users')
      .insert(user)
      .then(function() {
        knex('users')
        .where({'email':user.email})
        .then(function(data) {
          res.send({token:jwt.sign(data[0],process.env.SECRET),id:data[0].id,email:data[0].email, pivotalAPI:data[0].pivotalAPI});
        })
        .catch(function(err) {
          console.log(err);
        })
      })

    }
  })

}

exports.signIn = function(req, res, next) {

  var hash = bcrypt.hashSync(req.body.frm.password, 10);

  knex('users')
  .select('*')
  .where({'email': req.body.frm.email})
  .then(function(data) {

    console.log(hash)

    console.log(bcrypt.compareSync(data[0].password,hash))

    if(bcrypt.compareSync(data[0].password, hash)) {

      console.log('here')

      res.send({token:jwt.sign(data[0],process.env.SECRET),email:data[0].email, pivotalAPI:data[0].pivotalAPI});

    } else {
      res.send('error')
    }


  })
  .catch(function(err) {
    console.log(err);
  })

}
