// Initializes the `meetings` service on path `/meetings`
const { Meetings } = require('./meetings.class');
const createModel = require('../../models/meetings.model');
const hooks = require('./meetings.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/meetings', new Meetings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('meetings');

  service.hooks(hooks);
};
