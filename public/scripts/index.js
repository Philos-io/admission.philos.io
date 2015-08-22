(function(module){
	'use strict';

	function UserFactory($http, $location, AppConfig){
		function register(vm){
			var user = {
				github: vm.currentUser.github,
				email: vm.currentUser.email,
				company: vm.company,
				job: vm.job,
				programmingLanguage: vm.programmingLanguage,
				session: vm.session,
				isFreelance: vm.isFreelance
			};

			$http
				.post('/api/users/register', {user: user})	
				.then(success, error);

				function success(res){
					
					AppConfig.step = 3;

					if($location.$$host !== 'localhost'){
					    mixpanel.people.set({
					    	"$email": user.email,
					    	"$created": new Date(),
					        "company": user.company,
					        "programmingLanguage": user.programmingLanguage,
					        "isFreelance": user.isFreelance,
					        "source": "github"
					    });

					    mixpanel.track('confirmation page', {
							"step": 3,
							"process done": true
						});
					}


					// Deactive loading
					$location.path('/confirmation');
				}

				function error(err){}
		}

		function getCurrentUser(){
			return $http.get('/api/users/me');
		}

		return {
			register: register,
			getCurrentUser: getCurrentUser
		}
	}
	UserFactory.$inject = ['$http', '$location', 'AppConfig'];

	function AppController($http, $location, UserFactory, AppConfig){

			var vm = this;

			init();

			function init(){

				if (AppConfig.done) {
					$location.path('/confirmation');
				}

				UserFactory.getCurrentUser()
					.then(function(res){
						if (res.data) {
							vm.currentUser = AppConfig.currentUser = res.data;
							vm.session = "14th Sept - 19th Sept";

							// Registration step 2
							AppConfig.step = 2;

							if($location.$$host !== 'localhost'){
								mixpanel.identify(vm.currentUser.github);	

								mixpanel.track("Register with Github", {
									"step": 2,
								    "completed": false
								});
							}
						}
					});}

			vm.register = function(){
				UserFactory.register(vm);	
			};
	}
	AppController.$inject = ['$http', '$location', 'UserFactory', 'AppConfig'];

	function WelcomeController($location, AppConfig){

			// if (AppConfig.step === 3) AppConfig.step = 1;

			// if (AppConfig.step === 2) {
			// 	$location.path('/register');
			// }

			// this.navigateTo = function(url){
				
			// 	if($location.$$host !== 'localhost'){
			// 		mixpanel.track('Go to register page', {
			// 			"step": 1
			// 		});
			// 	}

			// 	$location.path(url);
			// }
	}
	WelcomeController.$inject = ['$location', 'AppConfig'];

	function ConfirmationController($location, $route, AppConfig){
		if (!AppConfig.done) {
			$location.path('/register');
		}
	}
	ConfirmationController.$inject = ['$location', 'AppConfig'];

	function Configuration($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: './views/welcome.html',
				controller: 'AppController',
				controllerAs: 'vm'
			})
			.when('/register', {
				templateUrl: './views/welcome.html',
				controller: 'AppController',
				controllerAs: 'vm'
			})
			.when('/confirmation', {
				templateUrl: './views/confirmation.html',
				controller: 'ConfirmationController',
				controllerAs: 'vm'
			});
	}
	Configuration.$inject = ['$routeProvider'];

	function mainDirective(){
		return {
			restrict: 'E',
			templateUrl: './views/main.html'
		};
	}

	function headerDirective(){
		return {
			restrict: 'E',
			templateUrl: './views/header.html'
		};
	}

	function disabledForm(){
		return {
			restrict: 'A',
			link: function($scope, $element, $attrs){

				$scope.$watch($attrs.disabledForm, function(disabled){
					if (!disabled) {
						$element.find('input').attr('disabled', true);
					}else{
						$element.find('input').attr('disabled', false);
					}
				});
			}
		}
	}

	angular.module('admission.philos.io', ['ngRoute'])
		.factory('UserFactory', UserFactory)
		.value('AppConfig', {
			currentUser: {},
			step: 1})
		.controller('AppController', AppController)
		.controller('WelcomeController', WelcomeController)
		.controller('ConfirmationController', ConfirmationController)
		.config(Configuration)
		.directive('philosHeader', headerDirective)
		.directive('philosAdmission', mainDirective)
		.directive('disabledForm', disabledForm);

	angular.bootstrap(document.body, ['admission.philos.io'], {strictDI: true});
})();