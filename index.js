import angular from 'angular';
import 'jquery';
import 'angular-route';
import 'materialize-css/bin/materialize.css';

import './css/style.css';

var {
	bootstrap
} = angular;
	

angular.module('app', ['ngRoute']);

bootstrap(document.body, ['app'], {strictDI: true});

// .factory('UserFactory', function($http, $location){
// 	function register(vm){
// 		var user = {
// 			github: vm.currentUser.github,
// 			company: vm.company,
// 			job: vm.job,
// 			programmingLanguage: vm.programmingLanguage,
// 			session: vm.session,
// 			isFreelance: vm.isFreelance
// 		};

// 		$http
// 			.post('/api/users/register', {user: user})	
// 			.then(success, error);

// 			function success(res){
// 				// Deactive loading
// 				$location.path('/confirmation');
// 			}

// 			function error(err){}
// 	}

// 	function getCurrentUser(){
// 		return $http.get('/api/users/me');
// 	}

// 	return {
// 		register: register,
// 		getCurrentUser: getCurrentUser
// 	}
// })

// .value('AppConfig', {
// 	currentUser: '',
// 	done: false
// })

// .controller('RegisterController', function($http, $location, UserFactory, AppConfig){
// 	var vm = this;

// 	init();

// 	function init(){

// 		if (AppConfig.done) {
// 			$location.path('/confirmation');
// 		}


// 		UserFactory.getCurrentUser()
// 			.then(function(res){
// 				if (res.data) {
// 					vm.currentUser = AppConfig.currentUser = res.data;
// 					vm.session = "14th Sept - 19th Sept";
// 				}
// 			});
// 	}

// 	vm.register = function(){
// 		UserFactory.register(vm);	
// 	};
// })

// .controller('WelcomeController', function($location, AppConfig){
// 	if (AppConfig.currentUser) {
// 		$location.path('/register');
// 	}
// })

// .controller('ConfirmationController', function($location, AppConfig){
// 	AppConfig.done = true;
// })

// .config(function($routeProvider){
	
// 	$routeProvider
// 		.when('/', {
// 			templateUrl: './welcome.html',
// 			controller: 'WelcomeController'
// 		})
// 		.when('/register', {
// 			templateUrl: './register.html',
// 			controller: 'RegisterController',
// 			controllerAs: 'vm'
// 		})
// 		.when('/register/:username', {
// 			templateUrl: './register.html',
// 			controller: 'RegisterController',
// 			controllerAs: 'vm'
// 		})
// 		.when('/confirmation', {
// 			templateUrl: './confirmation.html',
// 			controller: 'ConfirmationController'
// 		});
// });

// angular.bootstrap(document.body, ['admission.philos'], {strictDI: true});
