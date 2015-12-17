let shellTemplate = require('../views/welcome.html');

export default function shell(){
  return {
    restrict: 'E',
    template: shellTemplate
  };
}
