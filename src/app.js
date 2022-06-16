import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import createHttp from '@/utils/http'
import createApi from '@/api'

Vue.config.productionTip = false

export default context => new Promise(resolve => {
	let http = createHttp();
	let api = createApi(http);
	let store = createStore(api);
	let router = createRouter(store);

	setHttpIntercaptors(store, router, http);

	let productsPromise = store.dispatch('products/load');
	store.dispatch('user/autoLogin');
	let render = async () => {
		await productsPromise;
		new Vue({
			router,
			store,
			render: h => h(App),
			created(){
				resolve({app: this, api});
				store.dispatch('cart/load');
			}
		})
	}	

	if(process.isServer){
		router.push(context.url, render);
	}
	else{
		render();
	}
});

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

function setHttpIntercaptors(store, router, http){
	http.interceptors.response.use(
		response => {
			if('errorSuppression' in response.config && response.status === 200){
				response.data = { ok: true, data: response.data };
			}

			return response;
		},
		error => {
			if(error.response.status === 401 && error.config.silence401 !== true){
				//await 
				store.dispatch('user/cleanUser');
				router.push({ name: 'login' }, function(){
					// document.location.reload(); // опционально, либо чистим склад
				});
			}

			if(!('errorSuppression' in error.config)){
				return Promise.reject(error);
			}

			let es = error.config.errorSuppression;

			if('exclude' in es && es.exclude.includes(error.response.status)){
				return Promise.reject(error);
			}

			if('text' in es){
				let alert = { text: `Ошибка ответа от сервера ${es.text}` };

				if('critical' in es){
					alert.text += ' Рекомендуем перезагрузить страницу!';
				}
				else{
					alert.timeout = 3000;
				}
		
				store.dispatch('alerts/add', alert);
			}
			
			return { data: { ok: false } };
		}
	);
}