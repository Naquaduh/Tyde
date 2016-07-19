import {HomeModel} from './home.model';

export class HomeController {
	constructor($scope, $log) {
		$log.debug($scope);
		this._model = new HomeModel();
		this._model.url = 'https://github.com/Naquaduh/Tyde';
	}
	
	get url() {
		return this._model.url;
	}
}