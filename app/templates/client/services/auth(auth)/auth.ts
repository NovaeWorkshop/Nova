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

        private _user;
        private _ready: ng.IDeferred<boolean>;

        static $inject = ['$localStorage', '$q', '$http', '$window', '$state', 'CONFIG'];

        constructor(
            private $localStorage,
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $window: ng.IWindowService,
            private $state: ng.ui.IStateService,
            private CONFIG: IAppConfig) {

            this._ready = $q.defer();

            if ($localStorage.token) {
                $http.get(CONFIG.API_SERVER + '/api/users/me')
                    .then(res => this._user = res.data)
                    .finally(() => this._ready.resolve(true));
            } else
                this._ready.resolve(true);
        }

        ready() {
            return this._ready.promise;
        }

        signup(user) {
            var deferred = this.$q.defer();

            this.$http.post(this.CONFIG.API_SERVER + '/api/users', user)
                .then((res: IAuthCallback) => {
                    this._user = res.data.user;
                    this.$localStorage.token = res.data.token;
                    deferred.resolve();
                })
                .catch(err => deferred.reject(err.data));
            return deferred.promise;
        }

        login(user) {
            var deferred = this.$q.defer();

            this.$http.post(this.CONFIG.API_SERVER + '/auth/local', user)
                .then((res: IAuthCallback) => {
                    this._user = res.data.user;
                    this.$localStorage.token = res.data.token;
                    deferred.resolve();
                })
                .catch(err => deferred.reject(err.data));
            return deferred.promise;
        }

        facebookLogin() {
            var deferred = this.$q.defer();

            var url = this.CONFIG.API_SERVER + '/auth/facebook',
                width = 1000,
                height = 650,
                top = (window.outerHeight - height) / 2,
                left = (window.outerWidth - width) / 2,
                popup = this.$window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left + ',titlebar=no,toolbar=no,location=no,directories=no,menubar=no');

            window.addEventListener('message', e => {
                var message = e.data;

                if (message.status === 'success') {
                    popup.close();

                    this._user = message.user;
                    this.$localStorage.token = message.token;
                    this.$state.reload();

                    deferred.resolve();

                } else if (message.status === 'fail') {
                    popup.close();

                    delete this._user;
                    delete this.$localStorage.token;
                    this.$state.reload();

                    deferred.reject();
                }
            });
            return deferred.promise;
        }

        logout() {
            delete this.$localStorage.token;
            delete this._user;
        }

        isLogged() {
            return typeof this._user !== 'undefined';
        }

        getUser() {
            return this._user;
        }
    }

    angular.module('<%= appname %>').service('Auth', AuthService);
}
