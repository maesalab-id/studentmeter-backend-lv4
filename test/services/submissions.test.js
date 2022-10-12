const assert = require('assert');
const app = require('../../src/app');

describe('\'submissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('submissions');

    assert.ok(service, 'Registered the service');
  });
});
