const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/upload/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/download", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/download/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/download/files/*", { target: "http://localhost:5000/" }));
};
