const gagRouter = require('./gag');

module.exports = (app) => {
  app.use('/gag', gagRouter);
};
