(function () {
	'use strict';

	angular.module('app.register', ['ui.utils.masks', 'textAngular'])
	angular.module('app.nav', [])
	angular.module('app.utilities', [])
	angular.module('app.page', ['ui.utils.masks'])
	angular.module('app.services', ['ui.router', 'ui.router', 'ngStorage'])
	angular.module('app', [
		// Angular modules
		'ngAnimate',
		'ngAria',
		'ngStorage',
		'ngSidebarJS',
		'ngMessages',
		'ngResource',
		'app.services',

		// 3rd Party Modules
		'ui.bootstrap',
		'angular-loading-bar',
		'ui.router',
		'duScroll',

		// Custom modules
		'app.nav',
		'app.page',
		'app.register',
		'app.utilities'
	])
	.constant("APP_VERSION", "0.0.1")
	.constant("API_URI", "./api/");

})();
