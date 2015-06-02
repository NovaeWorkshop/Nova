/// <reference path="../../app.d.ts" />
'use strict';

angular.module('<%= appname %>')
  .config(function($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'app': {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
          }
        }
      });

  });
