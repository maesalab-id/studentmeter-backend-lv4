// Initializes the `classes` service on path `/classes`
const { Classes } = require('./classes.class');
const createModel = require('../../models/classes.model');
const hooks = require('./classes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/classes', new Classes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('classes');

  service.hooks(hooks);
};
