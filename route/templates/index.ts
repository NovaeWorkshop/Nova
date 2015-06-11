/// <reference path="../../app.d.ts" />
'use strict';

angular.module('<%= appname %>')
    .config(function($stateProvider) {

        $stateProvider
            .state('<%= state %>', {
                url: '<%= route %>',
                views: {
                    'app': {
                        templateUrl: 'views/<%= dashName %>/<%= dashName %>.html',
                        controller: '<%= controllerName %>',
                        controllerAs: 'vm'
                    }
                }
            });

    });
