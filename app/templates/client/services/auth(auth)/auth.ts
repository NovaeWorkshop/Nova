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

        static $inject = ['$cookieStore', '$q', '$http'];

        constructor(
            private $cookieStore: ng.cookies.ICookiesService,
            private $q: ng.IQService,
            private $http: ng.IHttpService) {

            var self = this;
            this.ready = $q.defer();

            if ($cookieStore.get('token')) {
                $http.get('/api/users/me')
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

            this.$http.post('/api/users', user)
                .then(function(res: IAuthCallback) {
                    self.user = res.data.user;
                    self.$cookieStore.put('token', res.data.token);
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

            this.$http.post('/auth/local', user)
                .then(function(res: IAuthCallback) {
                    self.user = res.data.user;
                    self.$cookieStore.put('token', res.data.token);
                    deferred.resolve();
                })
                .catch(function(err) {
                    deferred.reject(err.data);
                });
            return deferred.promise;
        }

        logout() {
            this.$cookieStore.remove('token');
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
