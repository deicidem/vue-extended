import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ProductsList from '@/views/ProductsList';
import Product from '@/views/Product';
import Cart from '@/views/Cart';
import Checkout from '@/views/Checkout';
import E404 from '@/views/E404';
import Login from '@/views/Login';
import OfficeBase from '@/views/office/Base';
import OfficeIndex from '@/views/office/Index';
import OfficeOrders from '@/views/office/Orders';

export default store => {
	let routes = [
		{
			name: 'products',
			path: '/',
			component: ProductsList
		},
		{
			name: 'products-item',
			path: '/products/:id',
			component: Product
		},
		{
			name: 'cart',
			path: '/cart',
			component: Cart
		},
		{
			name: 'checkout',
			path: '/order',
			component: Checkout
		},
		{
			name: 'login',
			path: '/login',
			component: Login,
			async beforeEnter(to, from, next){
				await store.getters['user/ready'];

				if(store.getters['user/isLogin']){
					next({ name: 'office' });
				}
				else{
					next();
				}
			}
		},
		{
			path: '/office',
			component: OfficeBase,
			meta: { auth: true },
			children: [
				{
					name: 'office',
					path: '',
					component: OfficeIndex
				},
				{
					name: 'office-orders',
					path: 'orders',
					component: OfficeOrders
				}
			]
		},
		{
			path: '*',
			component: E404
		}
	];

	const router = new VueRouter({
		mode: 'history',
		routes
	});

	router.beforeEach(async (to, from, next) => {
		if(process.isClient && to.matched.some(route => route.meta.auth)){
			await store.getters['user/ready'];

			if(!store.getters['user/isLogin']){
				next({ name: 'login' });
			}
			else{
				next();
			}
		}
		else{
			next();
		}
	});

	return router;
}