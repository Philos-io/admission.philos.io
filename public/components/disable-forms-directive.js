(function(){
  'use strict';

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

  angular.module('admission.philos.io').directive('disabledForm', disabledForm);
})();
