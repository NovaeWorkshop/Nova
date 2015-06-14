/// <reference path="../../app.d.ts" />
'use strict';

module <%= capName %>App.Directives.NavBar {

    angular.module('<%= appname %>')
        .directive('navBar', function () {
            return {
                restrict: 'E',
                templateUrl: 'directives/nav-bar/nav-bar.html',
                controller: function ($scope, Auth) {
                    $scope.Auth = Auth;
                }
            };
        });
}
