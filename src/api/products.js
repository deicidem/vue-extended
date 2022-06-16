export default server => ({
	async all(){
		let { data } = await server.get('products.php');
		return data;
	},
	async rating(id){
		let { data } = await server.get('ratings.php', {
			params: { id },
			errorSuppression: { text: 'при получении рейтинга товара' }
		});
		return data;
	},
	async mark(id, mark){
		let { data } = await server.put('ratings.php', { id, mark }, {
			errorSuppression: { text: 'при оценке товара' }
		});
		return data;
	}
})