<template>
	<div>
		<h1>Office screen screen</h1>
		<hr>
		<button class="btn btn-danger" @click="tryLogout">Logout</button>
		<hr>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions('user', ['logout']),
			async tryLogout(){
				await this.logout();
				this.$router.push({ name: 'login' })
			}
		}
	}
</script>