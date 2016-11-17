require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var stripe = require("stripe")("sk_test_qU6GDXGLTMU9nhpJPF982Ksb");

exports.submit = function(req, res, next) {

// Get the credit card details submitted by the form
  var token = req.body.item; // Using Express

  console.log(req.body);



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

  stripe.charges.create({
  amount: req.body.price * 100, // Amount in cents
  currency: "usd",
  source: req.body.item.id,
  description: "Example charge"
  }, function(err, charge) {
    console.log(charge);
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      console.log(err);
      res.send('error')
      return;
    } else {
      stripe.orders.create({
        currency: 'usd',
        items: items,
        shipping: {
          name: 'Sam Cate',
          address: {
            line1: '1234 Main Street',
            city: 'San Francisco',
            country: 'US',
            postal_code: '94111'
          }
        },
        email: 'avery.taylor@example.com'
      }, function(err, order) {
        console.log(order, err);
        // asynchronously called
    });
    }
  });
  //



}
