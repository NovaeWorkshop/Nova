/// <reference path="../../app.d.ts" />
'use strict';

module <%= capName %>App.Controllers.<%= controllerName %> {

	class <%= controllerName %> {

		public name = '<%= controllerName %>';

		static $inject = ['$scope'];

		constructor(
			private $scope: ng.IScope) {

		}

	}

	angular.module('<%= appname %>').controller('<%= controllerName %>', <%= controllerName %>);
}
