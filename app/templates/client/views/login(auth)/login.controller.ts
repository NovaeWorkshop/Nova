/// <reference path="../../app.d.ts" />
'use strict';

angular.module('<%= appname %>')
    .controller('LoginCtrl', function($location, Auth, $state) {

        var vm = this;

        angular.extend(vm, {

            name: 'LoginCtrl',

            /**
             * User credentials
             */
            user: { email: 'test@test.com', password: 'test' },

            /**
             * Login method
             */
            login: function() {
                Auth.login(vm.user)
                    .then(function() {
                        $location.path('/');
                    })
                    .catch(function(err) {
                        vm.error = err;
                    });
            },
            
            facebookLogin: function() {
                Auth.facebookLogin()
                    .then(function() {
                        $state.go('home');
                    }, function() {
                        $state.go('login');
                    });
            }

        });

    });
