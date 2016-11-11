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

  var items = {
    items: [],
    categories: {
      parts: [],
      vehicles: [],
      accessories: []
    }
  };

  knex('items')
  .select('*')
  .then(function(data) {
    items.items = data;
  })
  .then(function() {
    return knex('items')
    .select('*')
    .where({type:'Vehicle'})
    .then(function(data) {
      items.categories.vehicles = data;
    })
    .catch(function(err) {
      console.log(err);
    })
  })
  .then(function() {
    return knex('items')
    .select('*')
    .where({type:'Accessory'})
    .then(function(data) {
      items.categories.accessories = data;
    })
    .catch(function(err) {
      console.log(err);
    })
  })
  .then(function() {
    return knex('items')
    .select('*')
    .where({type:'Part'})
    .then(function(data) {
      items.categories.parts = data;
      res.send(items);
    })
    .catch(function(err) {
      console.log(err);
    })
  })
}


exports.addItem = function(req, res, next){


  var frm = {
    type: req.body.frm.type,
    make: req.body.frm.itemMakeInput,
    model: req.body.frm.itemModelInput,
    description: req.body.frm.itemDescriptionInput,
    image: req.body.frm.itemImgInput,
    price: req.body.frm.itemPriceInput,
    inStock: req.body.frm.inStock
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
