export default function UserFactory($http, $location, AppConfig){

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
      .post(AppConfig.registerUrl, {user: user})
      .then(success)
      .catch(error)

    function success(res){
      AppConfig.step = 3;
      AppConfig.done = true;
      $location.path('/confirmation');
    }

    function error(err){}
  }

  function getCurrentUser(){
    return $http.get(AppConfig.currentUserUrl)
      .then((response) => {
        return response.data;
      })
      .catch((error)=>{
        // you might want to do something here
      });
  }

  return {
    register: register,
    getCurrentUser: getCurrentUser
  }
}

UserFactory.$inject = ['$http', '$location', 'AppConfig'];

