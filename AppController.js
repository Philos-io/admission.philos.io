export default class AppController{
  constructor($http, $location, UserFactory, AppConfig){
    if (AppConfig.done) {
      $location.path('/confirmation');
    }

    UserFactory.getCurrentUser()
      .then(function(res){
        if (res.data) {
          this.currentUser = AppConfig.currentUser = res.data;
          this.session = "28th Sept - 3rd Oct";

          // Registration step 2
          AppConfig.step = 2;

          if($location.$$host !== 'localhost'){
            mixpanel.identify(this.currentUser.github);

            mixpanel.track("Register with Github", {
              "step": 2,
              "completed": false
            });
          }
        }
      });
  }

  register(){
    UserFactory.register(this);
  }
}

AppController.$inject = ['$http', '$location', 'UserFactory', 'AppConfig'];

