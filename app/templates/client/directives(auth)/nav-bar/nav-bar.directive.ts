/// <reference path="../../app.d.ts" />
'use strict';

angular.module('<%= appname %>')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html'
    };
  });
