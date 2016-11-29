require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var stripe = require("stripe")("sk_test_qU6GDXGLTMU9nhpJPF982Ksb");


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

  stripe.products.list(
    { limit: 10 },
    function(err, products) {
      // asynchronously called
      console.log(err,products);

      res.send(products)

    }
  );

//   knex('items')
//   .select('*')
//   .then(function(data) {
//     items.items = data;
//   })
//   .then(function() {
//     return knex('items')
//     .select('*')
//     .where({type:'Vehicle'})
//     .then(function(data) {
//       items.categories.vehicles = data;
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
//   })
//   .then(function() {
//     return knex('items')
//     .select('*')
//     .where({type:'Accessory'})
//     .then(function(data) {
//       items.categories.accessories = data;
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
//   })
//   .then(function() {
//     return knex('items')
//     .select('*')
//     .where({type:'Part'})
//     .then(function(data) {
//       items.categories.parts = data;
//       res.send(items);
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
//   })
}

// exports.selectItem = function(req, res, next) {
//
//   console.log(req.body.item)
//
// }


exports.addItem = function(req, res, next){


  var frm = {
    type: req.body.frm.type
    // description: req.body.frm.itemDescriptionInput,
    // image: req.body.frm.itemImgInput,
    // price: req.body.frm.itemPriceInput,
    // inStock: req.body.frm.inStock
  }

  console.log(req.body)



  stripe.products.create({
    name: req.body.frm.itemMakeInput + ' ' + req.body.frm.itemModelInput ,
    description: req.body.frm.itemDescriptionInput,
    attributes: ['color'],
    metadata: {
      type: req.body.frm.type
    },
    images: [req.body.frm.itemImgInput]
  }, function(err, product) {

    for (var i = 0; i < req.body.skus.length; i++) {

      stripe.skus.create({
        product: product.id,
        attributes: {color:req.body.skus[i].color},
        price: req.body.frm.itemPriceInput,
        currency: 'usd',
        inventory: {type: 'finite', quantity: req.body.skus[i].quantity}
      }, function(err, sku) {
        console.log(err, sku)
        // asynchronously called
      });

    }


  });





  // knex('items')
  // .insert(frm)
  // .then(function() {
  //   return knex('items')
  //   .select('*')
  //   .then(function(data) {
  //     res.send(data)
  //     console.log(data);
  //   })
  // })
}
