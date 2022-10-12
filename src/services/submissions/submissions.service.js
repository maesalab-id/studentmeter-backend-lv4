// Initializes the `submissions` service on path `/submissions`
const { Submissions } = require('./submissions.class');
const createModel = require('../../models/submissions.model');
const hooks = require('./submissions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/submissions', new Submissions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('submissions');

  service.hooks(hooks);
};
