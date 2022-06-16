export default server => ({
	async load(token){
		let { data } = await server.get('cart.php', { 
			params: { token },
			errorSuppression: { text: 'при загрузке корзины', critical: true }
		});
		return data;
	},
	async add(token, id){
		let { data } = await server.post('cart.php', { token, id }, {
			errorSuppression: { text: 'при добавлении товара' }
		});
		return data;
	},
	async remove(token, id){
		let { data } = await server.delete('cart.php', { 
			params: { token, id },
			errorSuppression: { text: 'при удалении товара' }
		});
		return data;
	},
	async change(token, id, count){
		let { data } = await server.put('cart.php', { token, id, cnt: count }, {
			errorSuppression: { text: 'при изменении количества товара', exclude: [ 422 ] }
		});
		return data;
	}
})