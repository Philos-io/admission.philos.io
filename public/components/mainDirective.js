let shell = require('../views/main.html');

export default function mainDirective(){
  return {
    restrict: 'E',
    template: shell
  };
}
