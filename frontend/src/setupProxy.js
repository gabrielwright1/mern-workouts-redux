const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://mern-workouts-redux-api.onrender.com',
			changeOrigin: true,
		})
	);
};
