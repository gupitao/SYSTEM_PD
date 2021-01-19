(function () {
	'use strict';

	angular.module('app')
		.constant('WEB_API_URL',	'../api/')
		.config(['$stateProvider',	'$urlRouterProvider', 'StateDinamicProvider',
			function($stateProvider, $urlRouterProvider, StateDinamicProvider) {

				$stateProvider
					.state('user', {
						url: '/user',
						templateUrl: './app/modules/register/user/user.html',
						controller: 'UserController',
						controllerAs: 'usCtrl',
						params: {'userObj': null}
					})
					.state('userList', {
						url: '/userList',
						templateUrl: './app/modules/register/user/user_list.html',
						controller: 'UserListController',
						controllerAs: 'usCtrl',
					})

				StateDinamicProvider.setState($stateProvider);

				$urlRouterProvider.otherwise("/userList");
			}
		]
	)
})();
