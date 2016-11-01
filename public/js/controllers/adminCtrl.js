app.controller('adminCtrl', ['$scope', '$http', 'Upload', '$timeout', function($scope, $http, Upload, $timeout) {

  // $scope.submit = function(frm) {
  //   console.log(frm);
  // }

  $scope.changeItemImage = function(img) {
    $('#imageInput').attr('src',img);
  }

  $scope.upload = function (dataUrl, name) {

    console.log('hit')
    Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {
          file: Upload.dataUrltoBlob(dataUrl, name)
      },
    }).then(function (response) {
      $timeout(function () {
          $scope.result = response.data;
      });
    }, function (response) {
        if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
          $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    });
  }

}])
