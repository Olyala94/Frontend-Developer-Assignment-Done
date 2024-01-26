// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://countries-274616.ew.r.appspot.com/',
      changeOrigin: true,
    })
  );
};
