/// <reference path="../../app.d.ts" />
'use strict';

angular.module('<%= appname %>')
	.filter('<%= camelName %>', function() {
		return function(input) {
			return input;
		};
	});
