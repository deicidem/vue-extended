<template>
	<div class="box">
		<transition-group name="item" tag="div">
			<div class="item" v-for="alert in alerts" :key="alert.id">
				{{ alert.text }}
			</div>
		</transition-group>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'; 

	export default {
		computed: {
			...mapGetters('alerts', { alerts: 'all' })
		}
	}
</script>
<style scoped>
	.box{
		position: fixed;
		right: 0;
		top: 0;
		width: 300px;
		z-index: 10000;
		padding: 10px 10px 0 0;
	}

	.item{
		margin: 0 0 10px 0;
		background: #444;
		color: #fff;
		border: 1px solid #fff;
		border-radius: 20px;
		padding: 10px;
	}

	.item-enter{
		opacity: 0;
	}

	.item-enter-active{
		transition: opacity 0.5s;
		opacity: 1;
	}

	.item-leave-active{
		transition: opacity 0.5s;
		opacity: 0;
	}
</style>