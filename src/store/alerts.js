export default () => {
	let messagesAI = 0;

	return {
		namespaced: true,
		state: {
			messages: []
		},
		getters: {
			all: state => state.messages,
		},
		mutations: {
			add(state, message){
				state.messages.push(message);
			},
			remove(state, id){
				state.messages = state.messages.filter(msg => msg.id !== id);
			}
		},
		actions: {
			add({ commit }, { text, timeout }){
				let id = ++messagesAI;
				commit('add', { id, text });

				if(timeout !== undefined){
					setTimeout(() => {
						commit('remove', id);
					}, timeout);
				}
			}
		}
	}
}