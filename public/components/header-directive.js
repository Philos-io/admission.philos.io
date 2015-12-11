(function(){
  'use strict';

  function headerDirective(){
    return {
      restrict: 'E',
      templateUrl: './views/header.html'
    };
  }

  angular.module('admission.philos.io').directive('philosHeader', headerDirective);

})();
