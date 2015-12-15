export default function ConfirmationController($location, AppConfig){
  if (!AppConfig.done) {
    $location.path('/register');
  }
}
ConfirmationController.$inject = ['$location', 'AppConfig'];

