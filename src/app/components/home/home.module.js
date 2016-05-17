import angular from 'angular';
import {HomeController} from './home.controller';

export default angular.module('tyde.home', [])
	// add constructor parameters via injection
	.controller('home.controller', /*@ngInject*/($scope, $log) => new HomeController($scope, $log)).name;