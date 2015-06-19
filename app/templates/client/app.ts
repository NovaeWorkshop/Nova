/// <reference path="app.d.ts" />
'use strict';

module <%= capName %>App {

    angular.module('<%= appname %>', [
        'ui.router'<% if (filters.ngStorage) { %>,
        'ngStorage'<% } %><% if (filters.ngResource) { %>,
        'ngResource'<% } %><% if (filters.ngSanitize) { %>,
        'ngSanitize'<% } %><% if (filters.ngAnimate) { %>,
        'ngAnimate'<% } %><% if (filters.sockets) { %>,
        'btford.socket-io'<% } %>
    ])

        .constant('CONFIG', {
            'API_SERVER': 'http://localhost:9000',
            'IS_DESKTOP_APP': (typeof isDesktopApp !== 'undefined' ? isDesktopApp : false)
        })

        .config(function(
            $stateProvider: ng.ui.IStateProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider,
            $locationProvider: ng.ILocationProvider<% if (filters.auth) { %>,
            $httpProvider: ng.IHttpProvider <% } %>,
            CONFIG: IAppConfig) {

            $urlRouterProvider.otherwise('/login');
            if (!CONFIG.IS_DESKTOP_APP)
                $locationProvider.html5Mode(true);<% if (filters.auth) { %>
            $httpProvider.interceptors.push('authInterceptor');<% } %>
        })<% if (filters.auth) { %>

        .factory('authInterceptor', function(
            $q: ng.IQService,
            $localStorage,
            $location: ng.ILocationService) {

            return {

                request: function(config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }

                    return config;
                },

                responseError: function(response) {
                    if (response.status === 401) {
                        $location.path('/login');
                        delete $localStorage.token;
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        })<% } %>;

}
