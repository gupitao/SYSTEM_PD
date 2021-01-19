(function() {
	'use strict';

	angular.module('app')
		.factory('appConfig', [appConfig]);

	function appConfig() {
		var pageTransitionOpts = [
			{
				name: 'Fade up',
				"class": 'animate-fade-up'
			}, {
				name: 'Scale up',
				"class": 'ainmate-scale-up'
			}, {
				name: 'Slide in from right',
				"class": 'ainmate-slide-in-right'
			}, {
				name: 'Flip Y',
				"class": 'animate-flip-y'
			}
		];

		var date	= new Date();
		var year	= date.getFullYear();
		var main	= {	brand: 'User',
						name: 'User Project',
						nameHeader: 'User Project',
						layout: 'wide',							// 'boxed', 'wide'
						menu: 'vertical',						// 'horizontal', 'vertical'
						isMenuCollapsed: false,					// true, false
						fixedHeader: true,						// true, false
						fixedSidebar: true,						// true, false
						pageTransition: pageTransitionOpts[1],	// 0, 1, 2, 3... and build your own
						skin: '23',								// 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
						year: year
					};

		var color	= {
			primary:	'#4E7FE1',
			success:	'#146E37',
			info:		'#6BBCD7',
			infoAlt:	'#7266BD',
			warning:	'#E9C842',
			danger:		'#E96562',
			gray:		'#DCDCDC'
		};

		return {
			pageTransitionOpts: pageTransitionOpts,
			main: main,
			color: color
		}
	}

})();