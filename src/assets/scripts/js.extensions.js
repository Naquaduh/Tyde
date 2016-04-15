/**
 * JavaScript Extensions
 * Created by jason.dimeo on 2016-04-07.
 */
import {defineProperties} from './util/defineProperties';

defineProperties(Boolean, {
	parse(value) {
		return value && value.toLowerCase() == 'true';
	}
});

defineProperties(Object, {
	instanceOf(obj, type) {
		return !!obj && obj.hasOwnProperty && obj instanceof type;
	}
});