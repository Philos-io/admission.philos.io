export default function Configuration($routeProvider){
  $routeProvider
     .when('/', {
       templateUrl: './views/welcome.html',
       controller: 'AppController',
       controllerAs: 'vm'
     })
     .when('/register', {
       templateUrl: './views/welcome.html',
       controller: 'AppController',
       controllerAs: 'vm'
     })
     .when('/confirmation', {
       templateUrl: './views/confirmation.html',
       controller: 'ConfirmationController',
       controllerAs: 'vm'
     });
}

Configuration.$inject = ['$routeProvider'];

