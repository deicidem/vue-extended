import * as cartApi from '@/api/cart.js';

export default cartApi => ({
	async load({ commit }){
		if (process.isClient) {
			let savedToken = localStorage.getItem('cartToken');
			let { ok, data } = await cartApi.load(savedToken);
	
			if(ok){
				let { token, needUpdate, cart } = data;
			
				if(needUpdate){
					localStorage.setItem('cartToken', token);
				}
					
				commit('set', { cart, token });
			}
		}
	},
	async add({ state, getters, commit, dispatch }, { id }){
		if(getters.canAdd(id)){
			commit('startProccess', id);
			let { ok, data } = await cartApi.add(state.token, id)
					
			if(ok && data){
				commit('add', { id });		
			}	

			commit('endProccess', id);
		}
	},
	async remove({ state, getters, commit }, { id }){
		if(getters.canUpdate(id)){
			commit('startProccess', id);
			let { ok, data } = await cartApi.remove(state.token, id)

			if(ok && data){
				commit('remove', { ind: getters.index(id) });
			}

			commit('endProccess', id);
		}
	},
	async setCnt({ state, getters, commit, dispatch }, { id, cnt }){
		if(getters.canUpdate(id)){
			commit('startProccess', id);
			let validCnt = Math.max(1, cnt);
			let { ok, data } = await cartApi.change(state.token, id, validCnt)
		
			if(ok && data){
				commit('setCnt', { ind: getters.index(id), cnt: validCnt });
			}
			
			commit('endProccess', id);
		}
	}
})