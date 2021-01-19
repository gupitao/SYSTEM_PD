angular.module('app.services').service("PersistentStore", function ($localStorage) {
	$localStorage.store					= $localStorage.store || {};
	$localStorage.store.sidebarModules	= $localStorage.store.sidebarModules || {};
	const _this	= this;
	this.store	= $localStorage.store;

	this.saveRoutes = function(routes){
		_this.store.routes = routes;
	}

	this.getRoutes = function(){
		return _this.store.routes || [];
	}

	this.saveSidebarModules = function(modulesObj){
		Object.assign(_this.store.sidebarModules, modulesObj);
	}

	this.getSidebarModules = function(){
		return _this.store.sidebarModules || {};
	}

	this.getTerminalID = () => {
		if ($localStorage.terminalID)
			return $localStorage.terminalID;

		var uuid = Util.uuid();

		$localStorage.terminalID = uuid;
		return uuid;
	};
	
	this.flushStorages = function(){
		return new Promise(function(resolve){
			localStorage.clear();
			sessionStorage.clear();
			setTimeout(function(){
				$localStorage.store = {};
				_this.store = $localStorage.store;
				resolve();
			});
		})
	}
});
