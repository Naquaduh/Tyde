export class HomeController {
	constructor() {
		this._url = 'https://github.com/Naquaduh/Tyde';
	}
	
	get url() {
		return this._url;
	}
}