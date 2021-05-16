import { getProducts } from './getProducts';

export const getProductsList = async (_event, _context, cb) => {
  try {
    const result = await getProducts();
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(
        result,
        null,
        2
      ),
    };
    return cb(null, response);
  } catch (err) {
    return cb(err);
  }
};
