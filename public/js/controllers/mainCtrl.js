app.controller('mainCtrl', ['$scope','$http', function($scope, $http) {

  $scope.user = localStorage;

  $scope.currentItem;

  $scope.shoppingCart = [];

  $scope.cartTotal = 0;

  $scope.items = {
    items: [],
    categories: {
      parts: [],
      vehicles: [],
      accessories: []
    }
  };



  var init = function() {

    console.log(localStorage)

    $scope.currentItem = JSON.parse(localStorage.currentItem);

    if (localStorage.shoppingCart !== 'undefined' && localStorage.shoppingCart) {
      $scope.shoppingCart = JSON.parse(localStorage.shoppingCart);

    }


    $http.get('/getItems')
    .then(function(res) {



      $scope.items.items = res.data.data;

      for (var i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].metadata.type === 'Vehicle') {
          $scope.items.categories.vehicles.push(res.data.data[i]);
        } else
        if (res.data.data[i].metadata.type === 'Part') {
          $scope.items.categories.parts.push(res.data.data[i]);
        } else
        if (res.data.data[i].metadata.type === 'Accessory') {
          $scope.items.categories.accessories.push(res.data.data[i]);
        }
      }

      console.log($scope.items)
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

    localStorage.currentItem = JSON.stringify(item);

  }

  $scope.addToCart = function(frm, item) {

    console.log(frm, item);

    var id;

    for (var i = 0; i < item.skus.data.length; i++) {
      if (item.skus.data[i].attributes.color === frm.colorSelect) {
        id = item.skus.data[i].id;
      }
    }

    var e = {
      skuId: id,
      price: item.skus.data[0].price,
      totalPrice: frm.itemQuantity * item.skus.data[0].price,
      quantity: frm.itemQuantity,
      name: item.name
    }

    $scope.shoppingCart.push(e);

    console.log($scope.shoppingCart);
    //
    localStorage.shoppingCart = JSON.stringify($scope.shoppingCart);

  }

  $scope.removeFromCart = function(item) {
    var i = $scope.shoppingCart.indexOf(item);
    $scope.shoppingCart.splice(i, 1);
    $scope.cartTotal -= item.price;
    console.log($scope.shoppingCart);
  }



}])
