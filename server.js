require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('./db/knex');
var bodyParser = require('body-parser');

var server = {
  main: require('./controllers/main.js'),
  admin: require('./controllers/admin.js'),
  checkout: require('./controllers/checkout.js')
}


app.use(express.static('public'));
app.use(bodyParser.json());


app.post('/signup', server.main.signUp)
app.post('/signin', server.main.signIn)

app.get('/getItems', server.admin.getItems)
app.post('/addItem', server.admin.addItem)

app.post('/checkout', server.checkout.submit)




app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
