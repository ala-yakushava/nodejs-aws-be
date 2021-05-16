import { getProducts } from './getProducts';

export const getProductsById = async (event, _context, cb) => {
  try {
    const productList = await getProducts();
    const { param } = event.pathParameters;
    const products = productList.filter(({ id }) => id === param);

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(
        products[0] || null,
        null,
        2
      ),
    };
    return cb(null, response);
  } catch (err) {
    return cb(err);
  }
};
