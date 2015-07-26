<h1 align="center">Nova</h1>

> This project is based on the [Bangular generator](https://github.com/42Zavattas/generator-bangular)

Nova is a simple, yet efficient generator, used to scaffold web projects.

*Nova is still under heavy development.  
Tests may be broken.*

Features:

* **Sub-generators** for `route`, `api`, `directive`, `service`, and plenty others...
* **[Express](https://github.com/strongloop/express) server** with nested routing architecture.
* **[Nodemon](https://github.com/remy/nodemon)** with **[LiveReload](https://github.com/vohof/gulp-livereload)** or **[BrowserSync](https://github.com/BrowserSync/browser-sync)** for the development process.
* **Automatic bower dependencies injection** on package install.
* **Test suite** — Unit tests with [Karma](https://karma-runner.github.io) & [Mocha](http://mochajs.org), e2e tests with [Protractor](https://github.com/angular/protractor).
* **[JSHint](https://github.com/jshint/jshint)** & **[JSCS](https://github.com/jscs-dev/node-jscs)** integration.
* **[Sass](https://github.com/sass/sass)** support.
* **Fast build**, like, real fast.

Optional:

* **sockets**, with [socket.io](https://github.com/Automattic/socket.io) and [angular-socket-io](https://github.com/btford/angular-socket-io)
* **authentication system**, with [Passport](https://github.com/jaredhanson/passport)
* **MongoDB**, with [Mongoose ODM](https://github.com/learnboost/mongoose)
* **mocked backend**, with [Restock](https://github.com/42Zavattas/Restock.io)
* **[SassDoc](https://github.com/SassDoc/sassdoc)** support

# Install

    npm install -g generator-nova
    yo nova

### Table of contents

- [Manage project](https://github.com/NovaeWorkshop/nova#manage-project)
- [Generators](https://github.com/NovaeWorkshop/nova#generators)
- [HOWTOs](https://github.com/NovaeWorkshop/nova#howtos)
  - [Protractor](https://github.com/NovaeWorkshop/nova#protractor)
  - [Sockets](https://github.com/NovaeWorkshop/nova#sockets)
  - [Passport](https://github.com/NovaeWorkshop/nova#passport)
- [Architecture](https://github.com/NovaeWorkshop/nova#architecture)

# Manage project

    gulp

**Default task, run the server.** Build `sass` files, inject all scripts and styles to the project, watch them and open your default browser.

    gulp build

Wipe old generated `dist` directory while keeping the `.git` to preserve your remotes configuration. Concat all the scripts and vendors in one minified `.js` file, same thing for your styles. Rev all resources for caching purposes; copy the server part.

    gulp preview

Run the `gulp build` process and serve the `dist` directory.

    gulp test [--client || --server]

Launch client and server tests, using Karma and Mocha, both by default.

    gulp control

Validate the app through [JSHint](http://jshint.com/) and [JSCS](http://jscs.info/).

    gulp bump [--major || --minor || --patch]

Bump versions of `package.json` and `bower.json` files using *Semantic Versioning* and commit them. Default to **patch**.

    gulp e2e

Launch your server and then run protractor tests. See [protractor howtos](https://github.com/NovaeWorkshop/nova#protractor).

# Generators

 - Global
  - [app](https://github.com/NovaeWorkshop/nova#app)
 - Client
  - [directive](https://github.com/NovaeWorkshop/nova#directive)
  - [filter](https://github.com/NovaeWorkshop/nova#filter)
  - [font](https://github.com/NovaeWorkshop/nova#font)
  - [route](https://github.com/NovaeWorkshop/nova#route)
  - [service / factory](https://github.com/NovaeWorkshop/nova#service)
  - [style](https://github.com/NovaeWorkshop/nova#style)
  - [animation](https://github.com/NovaeWorkshop/nova#animation)
 - Server
  - [api](https://github.com/NovaeWorkshop/nova#api)

## App

This is the main generator of Nova, that will scaffold entierely your project based on your needs.

    yo nova || yo nova <appName>

**Backend type**: MongoDB / [Restock](https://github.com/42Zavattas/Restock.io) / Json<br>
**Modules**     : angular-cookies || angular-resource || angular-sanitize || angular-animate<br>
**Socket.IO**   : Do you want to integrate sockets in your app?


## Directive

    yo nova:directive <name>

The **name** parameter is required. Directives will be generated at `client/directives/`. You can specify if your directive needs an html template or not.

## Filter

    yo nova:filter <name>

The **name** parameter is required. Filters will be generated at `client/filters/`.

## Font

    yo nova:font <name>

The **name** parameter is required. Fonts will generate a new folder in `client/assets/fonts/` and a `.scss` file importing all of these fonts in your app.
It will be imported in your `app.scss` file either on top of the file or after the `// imports` mark if specified.

## Route

    yo nova:route <name>

**Url**: Client url to access the route.

The **name** parameter is required. This will create in `client/views/`:

    name
    ├ name.js
    ├ name.controller.js
    ├ name.spec.js
    ├ name.e2e.js
    └ name.html

## Service

    yo nova:service <name>
    yo nova:factory <name>

The **name** parameter is required. The service / factory and its spec file will be generated at `client/services/`.

## Style

    yo nova:style <name>

**Inject**: If true, an `@import` will be added to the main *app.scss* file to add the style to your app.
You can specify the location of your new imports by adding a `// imports` in the file.

The **name** parameter is required. This will create a new `.scss` file in he `client/styles/` folder.

## Animation

    yo nova:anim <name>

Creates an angular animation file in `client/animations/`.
You can choose which event(s) you want to capture, including `enter`, `leave`, `move`, `addClass`, `removeClass`.

You need to have `ngAnimate` as dependency.

## Api

    yo nova:api <name>

**Url**: Route that will be exposed on your server to access this ressource.<br>
**Socket**: If you want to emit socket event on model changes (only with mongo & sockets).<br>
**Resource**: If you want to scaffold a basic `$resource` for this route (only with ngResource).

The **name** parameter is required. A **name** folder will be created at `server/api/`.

# HOWTOs

### Protractor

First, you will have to run the `gulp e2e:update` command to update the chromedriver and the selenium jar.
Since the path to the jar is hardcoded in the `protractor.conf.js` file and the version is susceptible to change, you will potentially have to update the version number.
For people which have multiple Chrome installed, you can specify the path to the binary in the configuration.
You can now run `gulp e2e`, remember to stop your server since it will automatically create a new one.

### Sockets

To use the sockets, you have to confirm the option on project generation.
Yet, it's only when you've selected the mongo backend that you can be prompted by this config.

This will initialize all the server part and create a `Socket` factory in the client.
On each new `api` you create, you can choose to load the sockets for this model.
It will then emit socket events on update and remove of documents of this model.

The sockets can be quickly usable in your controllers, [here is an example](https://gist.github.com/Apercu/9cd8b4b332948dc833f0) with a simple item.

### Passport

On project generation, you can integrate passport authentification in your app.
It will create default views for the signup and login. You can easily protect your routes for a connected user by adding the `isAuthenticated` middleware on it.

# Architecture

    client
    ├ animations/
    ├ assets
    │  ├ images/
    │  └ fonts/
    ├ bower_components/
    ├ directives/
    ├ filters/
    ├ services/
    ├ styles/
    ├ views/
    ├ app.js
    ├ index.html
    └ .jshintrc
    server
    ├ api/
    ├ config/
    ├ routes.js
    ├ server.js
    └ .jshintrc
    tasks
    ├ config/
    └ *.js
    bower.json
    gulpfile.js
    karma.conf.js
    package.json
    protractor.conf.js
    .editorconfig
    .gitignore
    .jscsrc
    .jshintrc
    .travis.yml
    .yo-rc.json


## License

BSD
