app.controller('authCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.submit = function(frm, type) {

    if (!type) {

      $http.post('/signup', {frm: frm})
      .then(function(res) {

        console.log(res.data)
        localStorage.jwt = res.data.token;
        localStorage.email = res.data.email;
        localStorage.id = res.data.id;

        console.log(localStorage)

      })
      .catch(function(err) {
        console.log(err);
      })

    }

    if (type === 'signin') {

      $http.post('/signin', {frm: frm, type: type})
      .then(function(res) {

        console.log(res.data)
        localStorage.jwt = res.data.token;
        localStorage.email = res.data.email;
        localStorage.id = res.data.id;

        console.log(localStorage)

      })
      .catch(function(err) {
        console.log(err);
      })

    }

  }



}])
