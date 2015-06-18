/// <reference path="../shared.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts" />

declare var isDesktopApp: boolean;

declare module <%= capName %>App {

    interface IAppConfig {
        API_SERVER: string;
        IS_DESKTOP_APP: boolean;
    }
<% if (filters.auth) { %>
    interface IAuthService {
        ready: () => ng.IPromise<boolean>;
        signup: (user: {}) => ng.IPromise<{}>;
        login: (user: {}) => ng.IPromise<{}>;
        facebookLogin: () => ng.IPromise<{}>;
        logout: () => void;
        isLogged: () => boolean;
        getUser: () => ng.IPromise<{}>;
    }
<% } %><% if (filters.sockets) { %>
    interface ISocketFactory {

        emit:
        /**
         * Simply emit a socket
         */
        () => any;

        on:
        /**
         * Listen for an event in the callback
         */
        (pattern, cb) => void;

        clean:
        /**
         * Remove all subscriptions that occured with the on method,
         * call it on the $destroy event.
         */
        () => void;

        syncModel:
        /**
         * Add a sync for a given model
         */
        (model, items) => void;

        unsyncModel:
        /**
         * Remove listeners for a model
         */
        (model) => void;
    }
<% } %>
}
