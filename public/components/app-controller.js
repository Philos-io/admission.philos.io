(function(){
  'use strict';

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
							vm.session = "25th JAN - 30th JAN";

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

  angular.module('admission.philos.io').controller('AppController', AppController);

})();
