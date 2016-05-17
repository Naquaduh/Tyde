export class HomeController {
	constructor($scope, $log) {
		$log.debug($scope);
		this._url = 'https://github.com/Naquaduh/Tyde';
	}
	
	get url() {
		return this._url;
	}
}