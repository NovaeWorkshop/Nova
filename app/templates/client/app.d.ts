/// <reference path="../shared.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts" />

declare module <%= capName %>App {

    interface IAuthService {
        signup: (user: {}) => ng.IPromise<{}>;
        login: (user: {}) => ng.IPromise<{}>;
        facebookLogin: () => ng.IPromise<{}>;
        logout: () => void;
        isLogged: () => ng.IPromise<boolean>;
        getUser: () => ng.IPromise<{}>;
    }

}
