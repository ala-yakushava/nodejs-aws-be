import productList from '../product-list.json';

export const getProductsById = (event, context, cb) => {
  const p = new Promise((resolve) => {
    resolve('success');
  });

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
  p.then(() => cb(null, response)).catch((e) => cb(e));
};
