app.controller('adminCtrl', ['$scope', '$http', 'Upload', '$timeout', function($scope, $http, Upload, $timeout) {

  $scope.partsList = {
    parts: [],
    totalQuantity: 0
  };

  $scope.submit = function(frm) {
    $http.post('/addItem', {frm:frm, skus:$scope.partsList.parts})
    .then(function(res) {


      $scope.items = res.data;

      console.log($scope.items);
    })
    .catch(function(err) {
      console.log(err);
    })
  }


  $scope.update = function(item) {
    $http.put('/updateItem', {item: item})
    .then(function(res) {
      $scope.items = res.data;
      console.log($scope.items)
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  $scope.delete = function(item) {
    $http.delete('/deleteItem', {item: item})
    .then(function(res) {
      $scope.items = res.data;
      console.log($scope.items)
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  $scope.select = function(item) {
    console.log(item);
    $('#itemTitleInput').val(item.title)
    $('#itemMakeInput').val(item.make)
    $('#itemModelInput').val(item.model)
    $('#itemDescriptionInput').val(item.description)
    $('#itemImgInput').val(item.image)
    $('#imgPreviewImg').attr('src',item.image)
    $('#itemPriceInput').val(item.price)
    $('#itemInventoryInput').val(item.inStock)


  }


  $scope.changeItemImage = function(img) {
    $('#imageInput').attr('ng-src',img);
  }

  $scope.addPart = function(part) {
    $scope.partsList.totalQuantity += part.itemInventoryInput;

    var e = {
      color: part.colorInput,
      quantity: part.itemInventoryInput
    }

    $scope.partsList.parts.push(e);

    return;
  }

  // $scope.upload = function (dataUrl, name) {
  //
  //   console.log('hit')
  //   Upload.upload({
  //     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
  //     data: {
  //         file: Upload.dataUrltoBlob(dataUrl, name)
  //     },
  //   }).then(function (response) {
  //     $timeout(function () {
  //         $scope.result = response.data;
  //     });
  //   }, function (response) {
  //       if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
  //   }, function (evt) {
  //         $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
  //   });
  // }

}])
