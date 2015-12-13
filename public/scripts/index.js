import angular, {module, bootstrap} from 'angular';
import 'angular-route';


import routes                 from '../components/routes';
import userFactory            from '../components/user-factory';
import AppController          from '../components/app-controller';
import philosAdmission        from '../components/main-directive';
import headerDirective        from '../components/header-directive';
import disabledForm           from '../components/disable-forms-directive';
import ConfirmationController from '../components/confirmation-controller';
import AppConfig              from '../components/app-config';

module('admission.philos.io', ['ngRoute'])
  .config(routes)
  .controller('AppController', AppController)
  .controller('ConfirmationController', ConfirmationController)
  .directive('disabledForm', disabledForm)
  .directive('philosHeader', headerDirective)
  .directive('philosAdmission', philosAdmission)
  .factory('userFactory', userFactory)
  .value('AppConfig', AppConfig);

document.addEventListener('DOMContentLoaded', ()=>{
  bootstrap(document.body, ['admission.philos.io'], {strictDI: true});
});
