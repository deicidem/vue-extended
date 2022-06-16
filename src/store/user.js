import * as authApi from '@/api/auth.js';
import * as Tokens from '@/utils/tokens';

export default authApi => {
	let autoLoginResolver;
	let autoLoginPromise = new Promise(resolve => { autoLoginResolver = resolve });

	return {
		namespaced: true,
		state: {
			user: null
		},
		getters: {
			ready: () => autoLoginPromise,
			isLogin: state => state.user !== null,
			checkRole: state => allowedRoles => state.user !== null && allowedRoles.some(role => state.user.roles.includes(role))
		},
		mutations: {
			setUser(state, user){
				state.user = user;
			}
		},
		actions: {
			async login({ commit }, { login, password }){
				let { ok, data } = await authApi.login(login, password);

				if(ok && data.res){
					Tokens.setTokens(data.accessToken);
					let { login, name, roles } = Tokens.getJWTPayload(data.accessToken);
					commit('setUser', { login, name, roles });
				}

				return data;
			},
			async autoLogin({ commit, dispatch }){
				if(process.isClient){
					let { ok, data } = await authApi.check();

					if(ok && data.res){
						let { login, name, roles } = Tokens.getJWTPayload(Tokens.getAccessToken());
						commit('setUser', { login, name, roles });
					}
					else{
						dispatch('cleanUser');
					}
				}
				
				autoLoginResolver();
			},
			async logout({ commit, dispatch }){
				let { ok, data } = await authApi.logout();
				
				if(ok && data){
					dispatch('cleanUser');
				}
			},
			async cleanUser({ commit }){
				commit('setUser', null);
				Tokens.cleanTokensData();
			}
		}
	}
}