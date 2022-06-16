import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import createCart from './cart';
import createProducts from './products';
import createAlerts from './alerts';
import createUser from './user';

import router from '@/router';

export default api => {
	const store = new Vuex.Store({
		modules: {
			cart: createCart(api.cart),
			products: createProducts(api.products),
			alerts: createAlerts(),
			user: createUser(api.auth)
		},
		strict: process.env.NODE_ENV !== 'production'
	});

	return store;
}