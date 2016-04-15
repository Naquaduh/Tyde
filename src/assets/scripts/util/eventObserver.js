/**
 * Event Observer. Simple event pub/sub class using the observer pattern.
 * Created by jason.dimeo on 2016-04-07.
 */
import pull from 'lodash/pull';

export class EventObserver {
	constructor(name) {
		this._name = name;
		this._callbacks = [];
	}

	get name() {
		return this._name;
	}

	publish(data) {
		this._callbacks.forEach(callbacks => callback(data));
	}

	subscribe(callback) {
		this._callbacks.push(callback);
	}

	unsubscribe(callback) {
		pull(this._callbacks, callback);
	}
}