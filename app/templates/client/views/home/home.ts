/// <reference path="../../app.d.ts" />
'use strict';

angular.module('<%= appname %>')
	.config(function($stateProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				views: {
					'app': {
						templateUrl: 'views/home/home.html',
						controller: 'HomeCtrl',
						controllerAs: 'vm'
					}
				}
			});

	});
