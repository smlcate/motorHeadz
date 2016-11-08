require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');


app.use(bodyParser.json());


exports.getItems = function(req, res, next) {
  knex('items')
  .select('*')
  .then(function(data) {
    res.send(data);
  })
}


exports.addItem = function(req, res, next){


  var frm = {
    title: req.body.frm.itemTitleInput,
    make: req.body.frm.itemMakeInput,
    model: req.body.frm.itemModelInput,
    description: req.body.frm.itemDescriptionInput,
    image: req.body.frm.itemImgInput,
    price: req.body.frm.itemPriceInput,
    inStock: req.body.frm.itemInventoryInput
  }

  console.log(frm)

  knex('items')
  .insert(frm)
  .then(function() {
    return knex('items')
    .select('*')
    .then(function(data) {
      res.send(data)
      console.log(data);
    })
  })
}
