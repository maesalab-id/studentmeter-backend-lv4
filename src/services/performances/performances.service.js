// Initializes the `performances` service on path `/performances`
const { Performances } = require('./performances.class');
const hooks = require('./performances.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/performances', new Performances(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('performances');

  service.hooks(hooks);
};
