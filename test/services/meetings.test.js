const assert = require('assert');
const app = require('../../src/app');

describe('\'meetings\' service', () => {
  it('registered the service', () => {
    const service = app.service('meetings');

    assert.ok(service, 'Registered the service');
  });
});
