app.controller('mainCtrl', ['$scope','$http', function($scope) {

  $scope.user = localStorage;

  $scope.items = [
    {
      title: 'Dirt Bike',
      price: 1200,
      inventory: 3,
      img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
    },
    {
      title: 'ATV',
      price: 2100,
      inventory: 2,
      img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
    },
    {
      title: 'Moped',
      price: 500,
      inventory: 5,
      img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
    },
    {
      title: 'Dirt Bike',
      price: 1200,
      inventory: 3,
      img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
    },
    {
      title: 'ATV',
      price: 2100,
      inventory: 2,
      img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
    },
    {
      title: 'Moped',
      price: 500,
      inventory: 5,
      img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
    },
    {
      title: 'Dirt Bike',
      price: 1200,
      inventory: 3,
      img: "http://worlds-super-bikes.com/wp-content/uploads/2015/12/list-of-best-dirt-bikes-724x506.jpg"
    },
    {
      title: 'ATV',
      price: 2100,
      inventory: 2,
      img: "http://atv.com.vsassets.com/blog/wp-content/uploads/2016/02/Bad-Boy-Onslaught-550-4x4-Feature.jpg"
    },
    {
      title: 'Moped',
      price: 500,
      inventory: 5,
      img: "https://optibike.com/wp-content/uploads/2015/02/gas-moped.png"
    },
  ];

  $scope.submit = function() {
    console.log(emailInput)
  }

}])
