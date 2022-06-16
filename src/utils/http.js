import axios from 'axios';
import * as Tokens from '@/utils/tokens';


export default () => {
	const instance = axios.create({
		baseURL: 'https://wp.dmitrylavrik.ru/vue-advanced-api-l3/',
		timeout: 10000,
		withCredentials: true
	});
	
	instance.interceptors.request.use(addAccessToken);
	
	instance.interceptors.response.use(
		request => request,
		error => {
			// check network error
			if(error.response === undefined){
				error.response = { status: 0  }; // add new field networkErr
			}

			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		request => request,
		async error => {
			if(error.response.status !== 401){
				return Promise.reject(error); // это не ошибка доступа
			}
	
			let response = await instance.get('auth/refresh/refresh.php');
	
			if(!response.data.res){
				return Promise.reject(error); // не было рефреш токена
			}
	
			Tokens.setTokens(response.data.accessToken);
			// в store тоже мб надо данные обновить
			return axios(addAccessToken(error.config));
		}
	);
	
	return instance;
}

function addAccessToken(request){
	let accessToken = Tokens.getAccessToken();

	if(accessToken !== null){
		request.headers.Authorization = `Bearer ${accessToken}`;
	}

	return request;
}
