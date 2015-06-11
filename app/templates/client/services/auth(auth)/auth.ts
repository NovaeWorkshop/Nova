/// <reference path="../../app.d.ts" />
'use strict';

module <%= capName %>App.Services.Auth {

    interface IAuthCallback extends ng.IHttpPromiseCallbackArg<{}> {
        data: {
            user: {};
            token: string;
        }
    }

    class AuthService implements IAuthService {

        private user;
        private ready;

        static $inject = ['$localStorage', '$q', '$http', '$window', '$state', 'API_SERVER'];

        constructor(
            private $localStorage,
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $window: ng.IWindowService,
            private $state: ng.ui.IStateService,
            private API_SERVER: string) {

            var self = this;
            this.ready = $q.defer();

            if ($localStorage.token) {
                $http.get(API_SERVER + '/api/users/me')
                    .then(function(res) {
                        self.user = res.data;
                    })
                    .finally(function() {
                        self.ready.resolve();
                    });
            } else
                self.ready.resolve();
        }

        signup(user) {
            var self = this;
            var deferred = this.$q.defer();

            this.$http.post(this.API_SERVER + '/api/users', user)
                .then(function(res: IAuthCallback) {
                    self.user = res.data.user;
                    self.$localStorage.token = res.data.token;
                    deferred.resolve();
                })
                .catch(function(err) {
                    deferred.reject(err.data);
                });
            return deferred.promise;
        }

        login(user) {
            var self = this;
            var deferred = this.$q.defer();

            this.$http.post(this.API_SERVER + '/auth/local', user)
                .then(function(res: IAuthCallback) {
                    self.user = res.data.user;
                    self.$localStorage.token = res.data.token;
                    deferred.resolve();
                })
                .catch(function(err) {
                    deferred.reject(err.data);
                });
            return deferred.promise;
        }

        facebookLogin() {
            var self = this;
            var deferred = this.$q.defer();

            var url = this.API_SERVER + '/auth/facebook',
                width = 1000,
                height = 650,
                top = (window.outerHeight - height) / 2,
                left = (window.outerWidth - width) / 2,
                popup = this.$window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left + ',titlebar=no,toolbar=no,location=no,directories=no,menubar=no');

            window.addEventListener('message', function(e) {
                var message = e.data;

                if (message.status === 'success') {
                    popup.close();

                    self.user = message.user;
                    self.$localStorage.token = message.token;
                    self.$state.reload();

                    deferred.resolve();

                } else if (message.status === 'fail') {
                    popup.close();

                    delete self.user;
                    delete self.$localStorage.token;
                    self.$state.reload();

                    deferred.reject();
                }
            });
            return deferred.promise;
        }

        logout() {
            delete this.$localStorage.token;
            delete this.user;
        }

        isLogged() {
            var self = this;
            var def = this.$q.defer();

            this.ready.promise.then(function() {
                if (typeof self.user !== 'undefined')
                    def.resolve();
                else
                    def.reject();
            });
            return def.promise;
        }

        getUser() {
            return this.user;
        }
    }

    angular.module('<%= appname %>').service('Auth', AuthService);
}
