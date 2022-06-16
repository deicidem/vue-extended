export default productsApi => ({
	namespaced: true,
	state: {
		items: null,
		rating: {
			average: 0,
			count: 0
		}
	},
	getters: {
		all: state => state.items,
		one: state => id => state.items.find(pr => pr.id == id),
		rating: state => state.rating
	},
	mutations: {
		setItems(state, items){
			state.items = items;
		},
		setRating(state, rating){
			state.rating = rating;
		}
	},
	actions: {
		async load({ commit }){
			let products = await productsApi.all();
			commit('setItems', products);
			return products;
		},
		async loadRating({ commit }, id){
			let { ok, data } = await productsApi.rating(id);
			
			if(ok){
				commit('setRating', { average: data.average.toFixed(2), count: data.count });
				return data;
			}

			return { average: 0, count: 0, your: null };
		}
	}
});