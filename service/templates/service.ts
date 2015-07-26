/// <reference path="../../app.d.ts" />
'use strict';

module <%= capName %>App.Services.<%= camelName %> {

	class <%= camelName %>Service {

		static $inject = [];

		constructor() {

		}
	}

	angular.module('<%= appname %>').service('<%= camelName %>', <%= camelName %>Service);
}
