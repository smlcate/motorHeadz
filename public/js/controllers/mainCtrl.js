app.controller('mainCtrl', ['$scope','$http', function($scope, $http) {

  $scope.user = localStorage;

  $scope.currentItem;

  $scope.shoppingCart = [];

  $scope.cartTotal = 0;

  $scope.items = [];

  var init = function() {
    $http.get('/getItems')
    .then(function(res) {
      $scope.items = res.data;
    })
  }

  init();

  // $scope.submit = function(frm) {
  //   $http.post('/addItem', {frm:frm})
  //   .then(function(res) {
  //     $scope.items = res.data;
  //     console.log($scope.items);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   })
  // }

  $scope.changeItemImage = function(img) {
    $('#imageInput').attr('src',img);
  }

  // $scope.items = [
  //   {
  //     title: 'Dirt Bike',
  //     price: 1200,
  //     inventory: 3,
  //     description: 'Rides well, and is super cool! Perfect condition',
  //     img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
  //   },
  //   {
  //     title: 'ATV',
  //     price: 2100,
  //     inventory: 2,
  //     description: 'Brand New ATV, never been ridden',
  //     img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
  //   },
  //   {
  //     title: 'Moped',
  //     price: 500,
  //     inventory: 5,
  //     description: 'Kind of a turd, but oh well',
  //     img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
  //   },
  //   {
  //     title: 'Dirt Bike',
  //     price: 1200,
  //     inventory: 3,
  //     description: 'Rides well, and is super cool! Perfect condition',
  //     img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
  //   },
  //   {
  //     title: 'ATV',
  //     price: 2100,
  //     inventory: 2,
  //     description: 'Brand New ATV, never been ridden',
  //     img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
  //   },
  //   {
  //     title: 'Moped',
  //     price: 500,
  //     inventory: 5,
  //     description: 'Kind of a turd, but oh well',
  //     img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
  //   },
  //   {
  //     title: 'Dirt Bike',
  //     price: 1200,
  //     inventory: 3,
  //     description: 'Rides well, and is super cool! Perfect condition',
  //     img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
  //   },
  //   {
  //     title: 'ATV',
  //     price: 2100,
  //     inventory: 2,
  //     description: 'Brand New ATV, never been ridden',
  //     img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
  //   },
  //   {
  //     title: 'Moped',
  //     price: 500,
  //     inventory: 5,
  //     description: 'Kind of a turd, but oh well',
  //     img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
  //   },
  //   {
  //     title: 'Dirt Bike',
  //     price: 1200,
  //     inventory: 3,
  //     description: 'Rides well, and is super cool! Perfect condition',
  //     img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
  //   },
  //   {
  //     title: 'ATV',
  //     price: 2100,
  //     inventory: 2,
  //     description: 'Brand New ATV, never been ridden',
  //     img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
  //   },
  //   {
  //     title: 'Moped',
  //     price: 500,
  //     inventory: 5,
  //     description: 'Kind of a turd, but oh well',
  //     img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
  //   },
  //   {
  //     title: 'Dirt Bike',
  //     price: 1200,
  //     inventory: 3,
  //     description: 'Rides well, and is super cool! Perfect condition',
  //     img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
  //   },
  //   {
  //     title: 'ATV',
  //     price: 2100,
  //     inventory: 2,
  //     description: 'Brand New ATV, never been ridden',
  //     img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
  //   },
  //   {
  //     title: 'Moped',
  //     price: 500,
  //     inventory: 5,
  //     description: 'Kind of a turd, but oh well',
  //     img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
  //   }
  //
  // ];

  $scope.byRange = function (fieldName, minValue, maxValue) {
  if (minValue === undefined) minValue = Number.MIN_VALUE;
  if (maxValue === undefined) maxValue = Number.MAX_VALUE;

  return function predicateFunc(item) {
    return minValue <= item[fieldName] && item[fieldName] <= maxValue;
    };
  };

  $scope.selectItem = function(item) {

    console.log(item)

    $scope.currentItem = item;
  }

  $scope.addToCart = function(item) {
    $scope.shoppingCart.push(item);
    $scope.cartTotal += item.price;
    console.log($scope.shoppingCart);
  }

  $scope.removeFromCart = function(item) {
    var i = $scope.shoppingCart.indexOf(item);
    $scope.shoppingCart.splice(i, 1);
    $scope.cartTotal -= item.price;
    console.log($scope.shoppingCart);
  }

}])
