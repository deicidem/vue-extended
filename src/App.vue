<template>
	<div id="app" class="grid-box">
		<app-alerts></app-alerts>
		<header class="mt-3">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col flex-norm">
						<div class="h3">Sample site</div>
						<div class="">About some and other products</div>
					</div>
					<div class="col flex-norm">
						<div>In Cart: {{ cartCount }}</div>
						<div>Total: {{ cartTotal }}</div>
					</div>
				</div>
				<hr>
				<nav class="navbar navbar-expand p-0">
					<ul class="navbar-nav">
						<router-link v-for="item in menuItems" 
											:to="{name: item.route}"
											:key="item.route"
											tag="li"
											class="nav-item"
											active-class="active"
											:exact="item.exact"
						>
							<a class="nav-link">{{item.title}}</a>
						</router-link>
					</ul>
				</nav>
				<hr>
			</div>
		</header>
		<section>
			<div class="container">
				<transition name="slide" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</section>
		<footer class="mb-3">
			<div class="container">
				<hr>
				<div>&copy; Rights not found</div>
			</div>
		</footer>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import AppAlerts from '@/components/Alerts';

	export default {
		components: {
			AppAlerts
		},
		computed: {
			...mapGetters('cart', {cartCount: 'totalCnt', cartTotal: 'totalSum'}),
			...mapGetters('user', ['isLogin']),
			menuItems(){
				let menu = [
					{ route: 'products', title: 'Products', exact: true },
					{ route: 'cart', title: 'Cart', exact: true },
					{ route: 'checkout', title: 'Checkout', exact: true }
				]
				menu.push(
					this.isLogin ? 
					{ route: 'office', title: 'Office', exact: false } :
					{ route: 'login', title: 'Login', exact: false }
				);

				return menu;	
			}
		}
	}
</script>

<style>
	.grid-box{
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100vh;
	}

	.flex-norm{
		flex: 0 1 auto !important;
		width: auto !important;
	}

	.active a{
		color: red;
	}

	.slide-enter-active{
		animation: slideIn 0.3s;
	}

	.slide-leave-active{
		animation: slideOut 0.3s;
	}

	@keyframes slideIn{
		from{transform: rotateY(90deg);}
		to{transform: rotateY(0deg);}
	}

	@keyframes slideOut{
		from{transform: rotateY(0deg);}
		to{transform: rotateY(90deg);}
	}

</style>