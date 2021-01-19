(function () {
	'use strict';

	angular
		.module('app')
		.provider('StateDinamic', StateDinamic);

	function StateDinamic(){
		var _stateProvider;

		this.setState = function(stateProvider){
			_stateProvider = stateProvider;
		};

		this.$get = ['PersistentStore', '$state',
			function(PersistentStore, $state){
				if(PersistentStore.getRoutes()){
					PersistentStore.getRoutes().forEach(function(route){
						if($state.href(route.cNomeRota) === null)
							_stateProvider.state(route.cNomeRota, JSON.parse(route.jConfigRota));
					});
				}
			}
		];
	}
})();