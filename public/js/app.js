var app = angular.module('mainApp', ['ui.router', 'ngFileUpload', 'ngImgCrop'])
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      // // HOME STATES AND NESTED VIEWS ========================================
      .state('home', {
          url: '/',
          templateUrl: './partials/home.html'
      })
      .state('explore', {
          url: '/explore',
          templateUrl: './partials/explore.html'
      })
      .state('select', {
          url: '/selectItem',
          templateUrl: './partials/itemInfo.html'
      })
      .state('admin', {
          url: '/admin',
          templateUrl: './partials/admin.html'
      })
      .state('signup', {
          url: '/signup',
          templateUrl: './partials/signup.html'
      })
      .state('signin', {
          url: '/signin',
          templateUrl: './partials/signin.html'
      })
      .state('checkout', {
          url: '/checkout',
          templateUrl: './partials/checkout.html'
      })

});
