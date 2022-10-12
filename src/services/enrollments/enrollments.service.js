// Initializes the `enrollments` service on path `/enrollments`
const { Enrollments } = require('./enrollments.class');
const hooks = require('./enrollments.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/enrollments', new Enrollments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('enrollments');

  service.hooks(hooks);
};
