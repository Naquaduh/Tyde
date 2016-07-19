import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ocLazyLoad from 'oclazyload';
import {StateService} from './shared/services/state.service';
import '../assets/styles/tyde.scss';

export default angular.module('tyde', [ocLazyLoad, uiRouter, uiBootstrap]).config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	`ngInject`;

	// use the HTML5 History API
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('app', StateService.generateAppState('core/layout'))
		.state('app.main', StateService.generateLayoutState('core'))
		.state('app.main.home', StateService.generateContentState('home'))
		.state('app.main.about', StateService.generateViewState('about'))
		.state('app.main.contact', StateService.generateViewState('contact'));
}).name;