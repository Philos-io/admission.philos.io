(function(){
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
				.then(success)
        .catch(error)

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
          AppConfig.done = true;
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


  angular.module('admission.philos.io').factory('UserFactory', UserFactory);

})();
