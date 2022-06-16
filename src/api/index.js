import createAuthApi from './auth';
import createCartApi from './cart';
import createProductsApi from './products';

export default http => ({
	auth: createAuthApi(http),
	cart: createCartApi(http),
	products: createProductsApi(http)
})