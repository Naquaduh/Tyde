export class StateService {
	/**
	 * Creates a simple view state
	 * @param {string} name - The name of the state
	 * @param {string} [path = {@link name}.view] - The optional path of the view
	 * @returns {{url: string, templateProvider: (function(): *)}}
	 */
	static generateViewState(name, path) {
		return {
			url: `/${name}`, templateProvider: /*@ngInject*/ $q => this.loadView(path || `${name}.view`, $q)
		};
	}

	/**
	 * Creates the application state.
	 * @param {string} path - The path to the view
	 * @returns {{url: string, abstract: boolean, template: *}}
	 */
	static generateAppState(path) {
		return {
			url: '',
			abstract: true,
			template: require(`../../components/${path}.html`)
		};
	}

	/**
	 * Creates the layout state.
	 * @param {string} path - The path to the header and footer
	 * @returns {{url: string, abstract: boolean, views: {header: {template: *}, content: {template: string}, footer: {template: *}}}}
	 */
	static generateLayoutState(path) {
		return {
			url: '',
			abstract: true,
			views: {
				header: {	template: require(`../../components/${path}/header.html`) },
				content: { template: '<ui-view/>'	},
				footer: { template: require(`../../components/${path}/footer.html`) }
			}
		};
	}

	/**
	 * Creates a content state.
	 * @param {string} name - The name of the state
	 * @param {string} [viewPath = {@link name}/{@link name}.view] - The view path.
	 * @returns {{url: string, controller: string, templateProvider: (function(): *), resolve: {loadModule: (function(): *)}}}
	 */
	static generateContentState(name, viewPath) {
		return {
			url: `/`,
			controller: `${name}.controller as ${name}`,
			templateProvider: /*@ngInject*/
				$q => this.loadView(viewPath || `${name}/${name}.view`, $q),
			resolve: {
				loadModule: /*@ngInject*/
					($q, $ocLazyLoad) => this.loadModule(`${name}/${name}`, $q, $ocLazyLoad)
			}
		};
	}

	/**
	 * Loads the specified view.
	 * @param {string} path - The path to the view
	 * @param {Function} $q - AngularJS $q service
	 * @returns {Promise} - Promise generated from loading the view
	 */
	static loadView(path, $q) {
		return $q(resolve => require.ensure([], () => resolve(require(`../../components/${path}.html`))));
	}

	/**
	 * Loads the specified module on-demand.
	 * @param {string} path - The path for the module
	 * @param {Function} $q - AngularJS $q service
	 * @param {object} $ocLazyLoad - The ocLazyLoader
	 * @returns {Promise} - Promise generated from loading the module
	 */
	static loadModule(path, $q, $ocLazyLoad) {
		return $q(resolve => require([`../../components/${path}.module`],
			module => resolve($ocLazyLoad.load({name: module.default}))));
	}
}