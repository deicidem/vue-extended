import createApp from '@/app.js';

export default context => new Promise(resolve => {
	createApp(context).then((app, api) => {
		context.rendered = () => {
			//context.title = app.$store.getters['meta/title'];
		}
		let store = app.$store;
		let params = app.$router.currentRoute.params;
		let matchedComponents = app.$router.getMatchedComponents().filter(elem => elem.hasOwnProperty('ssrData'));
		if (matchedComponents.length !== 0) {
			let promise = new Promise(resolve => {
				matchedComponents.forEach(async (element, i) => {
					await element.ssrData(store, params);
					if (i >= matchedComponents.length - 1) resolve();
				});
			})
			promise.then(() => {
				resolve(app);
			})
		} else {
			resolve(app);
		}
	})
});