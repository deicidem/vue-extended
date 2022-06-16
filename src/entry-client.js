import createApp from '@/app.js';

createApp().then(({app, api}) => {
	let store = app.$store;
	let params = app.$router.currentRoute.params;
	let matchedComponents = app.$router.getMatchedComponents();
	let arr = matchedComponents.filter(elem => elem.hasOwnProperty('ssrData'));
	if (arr.length !== 0) {
		let promise = new Promise(resolve => {
			arr.forEach(async (element, i) => {
				element.methods.setApi();
				await element.ssrData(store, params);
				console.log(element);
				if (i >= arr.length - 1) resolve();
			});
		})
		promise.then(() => {
			app.$mount('#app');
		})
	} else {
		app.$mount('#app');
	}
});