(function(){
  'use strict';

  function ConfirmationController($location, $route, AppConfig){
		if (!AppConfig.done) {
			$location.path('/register');
		}
	}
	ConfirmationController.$inject = ['$location', 'AppConfig'];

  angular.module('admission.philos.io').controller('ConfirmationController', ConfirmationController);
})();
