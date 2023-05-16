const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/apidemo',
    createProxyMiddleware({
      target: 'https://0a4900eb03074fca80a0356500c9003b.web-security-academy.net',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );

  app.use(
    '/apidemo/login',
    createProxyMiddleware({
      target: 'hthttps://0a4900eb03074fca80a0356500c9003b.web-security-academy.net/login',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};

