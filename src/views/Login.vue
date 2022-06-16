<template>
	<form>
		<div>
			<div>
				<b-form-input v-model="authData.login" placeholder="Login"></b-form-input>
			</div>
			<div>
				<b-form-input v-model="authData.password" placeholder="Password" type="password"></b-form-input>
			</div>
			<div>
				<button type="button" class="btn btn-primary" @click="tryLogin">Login</button>
			</div>
			<div v-if="authData.errorText != ''">
				<p class="mt-2 mb-0 text-danger">{{ authData.errorText }}</p>
			</div>
		</div>
	</form>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import { BFormInput, BFormTextarea } from 'bootstrap-vue';

	export default {
		components: {
			BFormInput
		},
		data(){
			return {
				authData: {
					login: '',
					password: '',
					errorText: ''
				}
			}
		},
		computed: {
			
		},
		methods: {
			...mapActions('user', ['login']),
			async tryLogin(){
				let login = await this.login({login: this.authData.login, password: this.authData.password});
				
				if(login.res){
					this.authData.login = '';
					this.authData.password = '';
					this.authData.errorText = '';
					this.$router.push({ name: 'office' });
				}
				else{
					this.authData.errorText = login.errors.join(',');
				}
			}
		}
	}
</script>