const document = require('./document');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use('/document/:id', document());
};
