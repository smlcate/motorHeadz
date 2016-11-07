app.controller('checkoutCtrl', ['$scope', '$http', function($scope, $http) {
  // var $form = $('#payment-form');
  // $form.submit(function(event) {
  //   // Disable the submit button to prevent repeated clicks:
  //   $form.find('.submit').prop('disabled', true);
  //
  //   // Request a token from Stripe:
  //   Stripe.card.createToken($form, stripeResponseHandler);
  //
  //   // Prevent the form from being submitted:
  //   return false;
  // });

  function stripeResponseHandler(status, response) {
    console.log(status)

    console.log(response);

    console.log(response.id)

    var order = {
      item: response,
      price: $scope.cartTotal
    }

    $http.post('/checkout', order)
    .then(function(res) {
      console.log(res.data)
    })

  };

  $scope.checkout = function(frm) {

    console.log(Stripe.card.createToken(frm, stripeResponseHandler));

  };
}])
