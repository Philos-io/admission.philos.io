let confirmationTemplate = require('../views/confirmation.html');

export default function confirmationDirective(){
  return {
    restrict: 'E',
    template: confirmationTemplate
  };
}
