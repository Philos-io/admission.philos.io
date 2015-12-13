export default class AppController{
  constructor($location, userFactory, AppConfig){

    if (AppConfig.done) {
      $location.path('/confirmation');
    }

    userFactory.getCurrentUser()
      .then((currentUser)=>{
        this.currentUser = AppConfig.currentUser = currentUser;
        this.githubUrl = AppConfig.githubUrl;
        this.session = "25th JAN - 30th JAN";
        AppConfig.step = 2;
      });

    this.userFactory = userFactory;
  }

  register(){
    this.userFactory.register(this);
  }

}

AppController.$inject = ['$location', 'userFactory', 'AppConfig'];

