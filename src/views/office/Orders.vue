<template>
	<div>
		<h1>User orders</h1>
	</div>
</template>

<script>
	//import server from '@/api/http';

	export default {
		created(){
			server.get('orders.php')
					.then(console.log)
					.catch(console.log);
		}
	}
</script>