(function(){
  'use strict';

	function mainDirective(){
		return {
			restrict: 'E',
			templateUrl: 'views/main.html'
		};
	}

  angular.module('admission.philos.io').directive('philosAdmission', mainDirective)
})();
