import angular, {module, bootstrap} from 'angular';
import 'angular-route';

import routes                 from '../components/routes';
import userFactory            from '../components/userFactory';
import AppController          from '../components/appController';
import philosAdmission        from '../components/mainDirective';
import headerDirective        from '../components/headerDirective';
import disabledForm           from '../components/disabledFormsDirective';
import ConfirmationController from '../components/confirmationController';
import confirmationDirective  from '../components/confirmationDirective';
import shelldirective         from '../components/shellDirective';
import AppConfig              from '../components/appConfig';


module('admission.philos.io', ['ngRoute'])
  .config(routes)
  .controller('AppController', AppController)
  .controller('ConfirmationController', ConfirmationController)
  .directive('disabledForm', disabledForm)
  .directive('philosHeader', headerDirective)
  .directive('philosAdmission', philosAdmission)
  .directive('shell', shelldirective)
  .directive('confirmation', confirmationDirective)
  .factory('userFactory', userFactory)
  .value('AppConfig', AppConfig);

document.addEventListener('DOMContentLoaded', ()=>{
  bootstrap(document.body, ['admission.philos.io'], {strictDI: true});
});
