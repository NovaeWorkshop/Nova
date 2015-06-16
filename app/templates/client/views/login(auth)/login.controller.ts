/// <reference path="../../app.d.ts" />
'use strict';

module <%= capName %>App.Views.Login {

    class LoginController {

        public name = 'LoginCtrl';
        public user;
        public error;

        static $inject = ['$location', '$state', 'Auth'];

        constructor(
            private $location: ng.ILocationService,
            private $state: ng.ui.IStateService,
            private Auth: IAuthService) {

            this.user = {
                email: 'test@test.com',
                password: 'test'
            };
        }

        login() {
            this.Auth.login(this.user)
                .then(() => this.$location.path('/'))
                .catch(err => this.error = err);
        }

        facebookLogin() {
            this.Auth.facebookLogin()
                .then(() => this.$state.go('home'),
                    () => this.$state.go('login'));
        }
    }

    angular.module('<%= appname %>').controller('LoginCtrl', LoginController);
}
