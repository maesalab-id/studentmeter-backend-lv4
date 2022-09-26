// Initializes the `majors` service on path `/majors`
const { Majors } = require('./majors.class');
const createModel = require('../../models/majors.model');
const hooks = require('./majors.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/majors', new Majors(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('majors');

  service.hooks(hooks);
};
