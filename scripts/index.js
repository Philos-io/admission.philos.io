(function(module){
	'use strict';

	angular.module('admission.philos', ['ngRoute'])

		.controller('MainController', function(){
			
		})

		.value('User', {
			currentUser: ''
		})

		.controller('RegisterController', function($routeParams, $http, $location, User){
			var username = $routeParams.user;

			var vm = this;

			if (username) {
				$http.post('/api/users', {username:  username})
					.then(function(res){
						User = res.data;
						vm.currentUser = User;
					});
			};

			vm.register = function(){

				// Active loading

				var user = {
					github: vm.currentUser.github,
					company: vm.company,
					job: vm.job,
					programmingLanguage: vm.programmingLanguage,
					session: vm.session
				};

				$http
					.post('/api/users/register', {user: user})	
					.then(success, error);


					function success(res){
						// Deactive loading
						$location.path('/confirmation');
					}

					function error(err){

					}
			};
		})

		.config(function($routeProvider){
			
			$routeProvider
				.when('/', {
					templateUrl: './welcome.html',
					controller: 'MainController'
				})
				.when('/register', {
					templateUrl: './register.html',
					controller: 'RegisterController',
					controllerAs: 'vm'
				})
				.when('/register/:username', {
					templateUrl: './register.html',
					controller: 'RegisterController',
					controllerAs: 'vm'
				})
				.when('/confirmation', {
					templateUrl: './confirmation.html',
					controller: 'MainController'
				});
		});

	//angular.bootstrap(document.body, ['admission.philos']);


})();