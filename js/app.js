var app = angular.module('app', [
    'ui.router',
    'ngCookies',
    'ngSanitize',
    'mgcrea.ngStrap',
    'ngFileSaver',
    'restangular',
    'smart-table',
    'ui.mask'
  ]).config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'homeCtrl',
         resolve: {
          contactData: function (PersonalData) {
            return PersonalData.getSavedData();
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'loginCtrl'
      })
      .state('conditions', {
        url: '/conditions',
        templateUrl: 'conditions.html',
        controller: 'conditionsCtrl'
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
        // TODO: Doublicating. Page has own data request
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
  .run(function ($rootScope, $state, $location, AuthorizationData,Restangular, $cookies) {
      Restangular.setBaseUrl("https://cdocs-wh.arancom.ru/");
      Restangular.setRestangularFields({
          id: "_id"
      });
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
          var shouldLogin = (toState.name !== 'login') && !AuthorizationData.getToken();
          $rootScope.stateIsLoading = true;
          $rootScope.userName = AuthorizationData.getLogin();
          if (shouldLogin) {
              $state.go('login');
              $rootScope.stateIsLoading = false;
              event.preventDefault();
              return;
          }
          // TODO: remove this or move to another place. Runs after every url change
          Restangular.setDefaultHeaders({
            "authentication-token": AuthorizationData.getToken()
          });
      });
      $rootScope.$on('$stateChangeSuccess', function () {
          $rootScope.stateIsLoading = false;
      });
      $rootScope.isLoggedIn = function () {
          return !!AuthorizationData.getToken()
      };
      $rootScope.logOut = function () {
          AuthorizationData.clearData();
          $rootScope.userName = null;
          $state.go('login');
      }
  });
