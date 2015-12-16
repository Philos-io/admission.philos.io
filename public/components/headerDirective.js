let header = require('../views/header.html');

export default function headerDirective(){
  return {
    restrict: 'E',
    template: header
  };
}

