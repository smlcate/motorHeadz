require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var stripe = require("stripe")("sk_test_qU6GDXGLTMU9nhpJPF982Ksb");

exports.submit = function(req, res, next) {

// Get the credit card details submitted by the form
  var token = req.body.item; // Using Express

  console.log('Token: ' + token.id);

  // console.log(req.body.shipping);



  // console.log(req.body.price);

  // stripe.orders.pay("or_19Cr4yKuIHfbIMlGTzA3HNdX", {
  //   source: token
  // }, function(err, order) {
  //   // called asynchronously
  //   console.log(order);
  // });

  // console.log(token)

  // console.log(req.body.cart)

  var items = [];

  for (var i = 0; i < req.body.cart.length; i++) {

    var e = {
      type: 'sku',
      parent: req.body.cart[i].skuId,
      quantity: req.body.cart[i].quantity
    }

    items.push(e);

  }


    stripe.orders.create({
      currency: 'usd',
      items: items,
      shipping: {
        name: req.body.item.card.name,
        address: {
          line1: req.body.item.card.address_line1,
          city: req.body.item.card.address_city,
          country: 'US',
          postal_code: req.body.item.card.address_zip
        }
      },
      email: 'smlcate@yahoo.com'
    }, function(err, order) {
      console.log('Order: ' + order, err);

      // asynchronously called
      return stripe.orders.pay(order.id, {
        source: token.id // obtained with Stripe.js
      }, function(err, order) {
        // asynchronously called
        if (err && err !== null) {
          console.log(err)
          res.send('error')

        } else {
          // console.log(order)
          res.send('success')
        }

      });

  });

  //



}
