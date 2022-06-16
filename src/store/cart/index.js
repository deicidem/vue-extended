import initState from './state';
import getters from './getters';
import mutations from './mutations';
import initActions from './actions';

export default cartApi => ({
	namespaced: true,
	state: initState(),
	getters,
	mutations,
	actions: initActions(cartApi)
})