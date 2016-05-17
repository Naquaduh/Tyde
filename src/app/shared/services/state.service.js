export class StateService {
	static generateViewState(name, path) {
		return {
			url: `/${name}`, templateProvider: /*@ngInject*/ $q => this.loadView(path || name, $q)
		};
	}
	
	static generateAppState(path) {
		return {
			url: '',
			abstract: true,
			template: require(`../../components/${path}.html`)
		};
	}

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
	
	static generateContentState(name, viewPath) {
		return {
			url: `/`,
			controller: `${name}.controller as ${name}`,
			templateProvider: /*@ngInject*/
				$q => this.loadView(viewPath || `${name}/${name}`, $q),
			resolve: {
				loadModule: /*@ngInject*/
					($q, $ocLazyLoad) => this.loadModule(`${name}/${name}`, $q, $ocLazyLoad)
			}
		};
	}
	
	static loadView(path, $q) {
		return $q(resolve => require.ensure([], () => resolve(require(`../../components/${path}.view.html`))));
	}
	
	static loadModule(path, $q, lazyLoader) {
		return $q(resolve => require([`../../components/${path}.module`],
			module => resolve(lazyLoader.load({name: module.default}))));
	}
}