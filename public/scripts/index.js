(function(module){
	'use strict';

	angular.module('admission.philos.io', ['ngRoute'])

  document.addEventListener('DOMContentLoaded', function(){
    angular.bootstrap(document.body, ['admission.philos.io'], {strictDI: true});
  });
})();
