(function () {
	'use strict';

	angular.module('app')
		.controller('UserListController',	UserListCtrl)
		.controller('UserController',		UserCtrl);

	function UserListCtrl($scope, SweetAlert, APIService, $state){
		$scope.initialize = function (){
			APIService.getRequest("user/initialize", {})
				.then(function(result){
					if(result){
						$scope.usuarios = result.usuarios || [];
					}
				}, SweetAlert.APIError)
		}

		$scope.newOrEdit = function(userObj){
			$state.go("user", {userObj: userObj});
		}

		$scope.deleteUser = function(index, userObj){
			SweetAlert.confirm("Confirmar exclusão do registro?").then(function(){
				APIService.postRequest('user/deleteUser', userObj)
					.then(function(){
						SweetAlert.success("Usuário excluído!");
						$scope.usuarios.splice(index, 1);
					}, SweetAlert.APIError);
			})

		}

	}


	function UserCtrl($scope, SweetAlert, APIService, $stateParams, $state, $http, $resource) {
		$scope.userObj = $stateParams.userObj ? $stateParams.userObj : {iCodUsuario: 0};

		$scope.saveUser = function(userObj){
			APIService.postRequest('user/saveUser', userObj)
			.then(function(){
				SweetAlert.success("Usuário salvo.").then(function (){
					$scope.back()
				});

			}, SweetAlert.APIError);
		}

		$scope.clearFields = function(){
			$scope.userObj = {iCodUsuario: 0, cEmail: ''};
		}

		$scope.back = function (){
			$state.go("userList", {});
		}

		$scope.getCep = function (userObj){
			$http.defaults.useXDomain = true;
			let resources = $resource("https://viacep.com.br/ws/:cCep/json/", {cCep: "@cCep"});

			if(userObj.cCep.length === 8){
				resources.get({'cCep': userObj.cCep}).$promise.then(function (cepObj){
					$scope.userObj.cEndereco 	= cepObj.logradouro 	|| null;
					$scope.userObj.cBairro 		= cepObj.bairro 		|| null;
					$scope.userObj.cEstado 		= cepObj.uf 			|| null;
					$scope.userObj.cCidade 		= cepObj.localidade 	|| null;
				});
			}
		}

		$scope.validaData = function (date){
			let data = date;
			let dia = data.substring(0,2)
			let mes = data.substring(3,5)
			let ano = data.substring(6,10)

			//Criando um objeto Date usando os valores ano, mes e dia.
			let novaData = new Date(ano,(mes-1),dia);

			let mesmoDia = parseInt(dia,10) === parseInt(novaData.getDate());
			let mesmoMes = parseInt(mes,10) === parseInt(novaData.getMonth())+1;
			let mesmoAno = parseInt(ano) === parseInt(novaData.getFullYear());

			if (!((mesmoDia) && (mesmoMes) && (mesmoAno))){
				SweetAlert.warning('Data de nascimento inválida!');
				$scope.userObj.dtNascimento = null;
			}
		}
	}
})();
