module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptons.poll = 300;
    return config;
  }
};