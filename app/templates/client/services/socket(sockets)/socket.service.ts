/// <reference path="../../app.d.ts" />
'use strict';

module <%= capName %>App.Factories.Socket {

	function SocketFactory(socketFactory): ISocketFactory {

		var ioSocket = io('', {
			path: '/socket.io'
		});

		var subs = [];

		var socket = socketFactory({ ioSocket: ioSocket });

		function idMap(items) {
			return items.map(e => e._id);
		}

		return {

			emit: socket.emit,

			on: (pattern, cb) => {
				subs.push(pattern);
				socket.on(pattern, cb);
			},

			clean: () => {
				subs.forEach(sub => socket.removeAllListeners(sub));
				subs = [];
			},

			syncModel: (model, items) => {

				socket.on(model + ':save', doc => {
					var index = idMap(items).indexOf(doc._id);
					if (index === -1) {
						items.push(doc);
					} else {
						items.splice(index, 1, doc);
					}
				});

				socket.on(model + ':remove', doc => {
					var index = idMap(items).indexOf(doc._id);
					if (index !== -1) {
						items.splice(index, 1);
					}
				});

			},

			unsyncModel: (model) => {
				socket.removeAllListeners(model + ':save');
				socket.removeAllListeners(model + ':remove');
			}
		};
	}

	SocketFactory.$inject = ['socketFactory'];

	angular.module('<%= appname %>').factory('Socket', SocketFactory);
}
