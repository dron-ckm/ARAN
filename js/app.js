var app = angular.module('app', [
    'ui.router',
    'ngCookies'
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
        controller: 'senderData'
      })
      
  }])
  .run(function ($rootScope, $state, $location, AuthorizationData, $cookies) {
  
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      var shouldLogin = (toState.name !== 'login') && !AuthorizationData.getToken();

      if (shouldLogin) {
          $state.go('login');
          event.preventDefault();
          return;
      }
      /*
      var shouldLogin = toState.data !== undefined
                    && toState.data.requireLogin 
                    && !authorizationData.isLoggedIn ;
      
      // NOT authenticated - wants any private stuff
      if(shouldLogin)
      {
        $state.go('login');
        event.preventDefault();
        return;
      }
      
      /*
      // authenticated (previously) comming not to root main
      if(Auth.isLoggedIn) 
      {
        var shouldGoToMain = fromState.name === ""
                          && toState.name !== "main" ;
          
        if (shouldGoToMain)
        {
            $state.go('main');
            event.preventDefault();
        } 
        return;
      }
      
      // UNauthenticated (previously) comming not to root public 
      var shouldGoToPublic = fromState.name === ""
                        && toState.name !== "public"
                        && toState.name !== "login" ;
        
      if(shouldGoToPublic)
      {
          $state.go('public');console.log('p')
          event.preventDefault();
      } 
      */
      // unmanaged
    });
  })
