'use strict';

describe('AppController', function(){

  beforeEach(module('admission.philos.io'));

  let $controller, $scope;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;

    let ctrl = $controller('AppController', {$scope: $scope});
  }));

  it('View model associated with the Appcontroller', function(){

  })
});
