'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('underscore.string');

var utils = require('../util');

var NovaGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.appName = _.camelize(this.appname);
    this.capName = _.capitalize(this.appName);
    this.controllerName = _.capitalize(_.camelize(this.name)) + 'Controller';
    this.controllerAlias = _.capitalize(_.camelize(this.name)) + 'Ctrl';
    this.dashName = _.dasherize(this.name);
    this.routeName = this.dashName.split('.').reverse()[0];
  },

  prompting: function () {
    var self = this;
    var done = self.async();
    self.prompt([
      {
        type: 'confirm',
        name: 'abstract',
        message: 'Abstract state?',
        default: false
      }, {
        type: 'input',
        name: 'state',
        message: 'Define state name',
        default: self.dashName
      }, {
        type: 'input',
        name: 'route',
        message: 'Choose an url route',
        default: '/' + self.routeName
      }, {
        type: 'confirm',
        name: 'import',
        message: 'Do you want to create and import the ' + chalk.blue(this.dashName + '.scss') + ' style in your app.scss?',
        default: false
      }], function (props) {
        self.abstract = props.abstract;
        self.state = props.state;
        self.route = props.route;
        self.import = props.import;
        done();
      });
  },

  writing: function () {

    var basePath = 'client/views/' + this.dashName + '/' + this.dashName;

    this.template('index.ts', basePath + '.ts');
    this.template('controller.ts', basePath + '.controller.ts');
    this.template('view.html', basePath + '.html');

    var filters = this.config.get('filters');

    if (filters && filters.karma) {
      this.template('spec.js', basePath + '.spec.js');
    }
    if (filters && filters.e2e) {
      this.template('e2e.js', basePath + '.e2e.js');
    }

    if (this.import) {

      this.template('style.scss', basePath + '.scss');

      setTimeout(function () {

        utils.appendNeedleOrOnTop({
          needle: '// imports',
          file: 'client/styles/app.scss',
          append: '@import "../views/' + this.dashName + '/' + this.dashName + '";'
        }, function importCallback(err) {
            /* istanbul ignore if */
            if (err) {
              utils.bangLog('There was an error importing the style.', 'red');
            } else {
              utils.bangLog('Your style was successfully injected.', 'green');
            }
          });

      }.bind(this), 250);

    }

  }

});

module.exports = NovaGenerator;
