<template>
	<div v-if="loaded && isLogin">
		<slot></slot>
	</div>
	<div class="spinner-border" role="status" v-else>
		<span class="sr-only">Loading...</span>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		data: () => ({ loaded: false }),
		computed: {
			...mapGetters('user', ['ready', 'isLogin'])
		},
		async created(){
			await this.ready;
			this.loaded = true;
		}
	}
</script>