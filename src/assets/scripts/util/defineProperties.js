/**
 * defineProperties. Adds properties to Object
 * Created by jason.dimeo on 2016-04-07.
 */

var _arePropertyDescriptorsSupported = () => {
	let attempt = () => {
		Object.defineProperty({}, 'x', {});
		return true;
	};
	let supported = false;
	try { supported = attempt(); } catch (e) { /* this is IE 8. */ }
	return supported;
};

var supportsDescriptors = !!Object.defineProperty && _arePropertyDescriptorsSupported();

export function defineProperties(object, map) {
	Object.keys(map).forEach(name => {
		let method = map[name];
		if (name in object) {
			return;
		}

		if (supportsDescriptors) {
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: false,
				writable: true,
				value: method
			});
		} else {
			object[name] = method;
		}
	});
}