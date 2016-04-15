import angular from 'angular';
import uirouter from 'angular-ui-router';
import ocLazyLoad from 'oclazyload';
import '../assets/scripts/js.extensions';
import '../assets/styles/app.scss';

angular.module('tyde', [ocLazyLoad, uirouter]).config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	`ngInject`;

	// use the HTML5 History API
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	
	$stateProvider.state('home', {
		url: '/',
		template: require('./components/home/home.view.html'),
		controller: 'home.controller',
		controllerAs: 'controller',
		resolve: {
			loadModule: ($q, $ocLazyLoad) => $q((resolve) => require(['./components/home/home.module'],
				(module) => resolve($ocLazyLoad.load({name: module.default}))))
		}
	});
});