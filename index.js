import angular from 'angular';
//import 'angular-ui-router';
import 'angular-route';
import $ from 'jquery';
import welcome from './welcome.html';
import register from './register.html';

console.log(register);


var {bootstrap} = angular;

angular.module('admission.philos', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/', {
			template: welcome,
			controller: function(){
				console.log('inside welcome');
			}
		})
		.when('/register', {
			template: register,
			controller: function(){
				console.log('inside register');
			}
		});
}]);

var entry = '<div ng-view></div>';

$(document.body).append(entry);


bootstrap(document, ['admission.philos'], {strictDI: true});
