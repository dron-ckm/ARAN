var app = angular.module('app', [
    'ui.router',
    'ngCookies',
    'ngSanitize',
    'mgcrea.ngStrap',
    'ngFileSaver'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'homeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'loginCtrl'
      })
      .state('conditions', {
        url: '/conditions',
        templateUrl: 'conditions.html',
        controller: 'conditions'
      })
      .state('registry', {
        url: '/registry',
        templateUrl: 'registry.html',
        controller: 'registryCtrl'
      })
      .state('actsChecking', {
        url: '/actsChecking',
        templateUrl: 'actsChecking.html',
        controller: 'actsCheckingCtrl'
      })
      .state('senderData', {
        url: '/senderData',
        templateUrl: 'senderData.html',
        controller: 'senderDataCtrl'
      })
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'contacts.html',
        controller: 'contactsCtrl'
      })
      .state('ordersHistory', {
        url: '/ordersHistory',
        templateUrl: 'ordersHistory.html',
        controller: 'ordersHistoryCtrl',
        resolve: {
          historyData: function (OrdersHistoryData) {
            return OrdersHistoryData.getData();
          }
        }
      })
      .state('newOrder', {
        url: '/newOrder',
        templateUrl: 'newOrder.html',
        controller: 'newOrderCtrl'
      })
      
  }])
  .run(function ($rootScope, $state, $location, AuthorizationData, $cookies) {
  
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      var shouldLogin = (toState.name !== 'login') && !AuthorizationData.getToken();

      $rootScope.stateIsLoading = true;

      if (shouldLogin) {
          $state.go('login');
          event.preventDefault();
          return;
      }
    });
    $rootScope.$on('$stateChangeSuccess',function(){
      $rootScope.stateIsLoading = false;
    });


  
  })
