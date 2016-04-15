export class HomeController {
	constructor() {
		this._url = 'https://github.com/preboot/angular-webpack';
	}
	
	get url() {
		return this._url;
	}
}