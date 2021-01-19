angular.module('app.services')
	.service('APIService',
	function (APP_VERSION, API_URI, PersistentStore, $http, SweetAlert) {
		var requestInProgress = 0;

		function request(options){
			requestInProgress++;

			if(requestInProgress === 1){
				SweetAlert.loading('Processando...');
			}

			var defaultOptions = {
				method: 'POST',
				headers: {
					Authorization: "Bearer " + PersistentStore.store,
					TERMINAL_ID: PersistentStore.getTerminalID(),
					VERSION: APP_VERSION
				}
			};

			Object.assign(defaultOptions, options);

			return $http(defaultOptions)
			.then(function(result){
				requestInProgress--;

				if(result.data.error){
					return Promise.reject(result.data.error);
				}

				if(requestInProgress == 0){
					SweetAlert.close();
					
					return new Promise(function(resolve){
						setTimeout(function(){
							resolve(result.data);
						}, 200)
					})
				}

				return result.data;
			}, function(error){
				console.log(error);
				requestInProgress--;
				
				if(requestInProgress == 0){
					SweetAlert.close();

					return new Promise(function(resolve, reject){
						setTimeout(function(){
							if(error)
								reject(error);
							else
								reject("Falha na requisição");
						}, 200);
					})
				}

				return Promise.reject(error);
			});
		}

		this.postRequest = (endpoint, data) => {
			var options = {
				url: API_URI+endpoint,
				method: "POST",
				data: data
			}
			return request(options);
		}

		this.getRequest = (endpoint, params) => {

			var options = {
				url: API_URI+endpoint,
				method: "GET",
				params: params
			}
			return request(options);
		}
	}
);
