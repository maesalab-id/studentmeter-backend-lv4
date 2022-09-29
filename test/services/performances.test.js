const assert = require('assert');
const app = require('../../src/app');

describe('\'performances\' service', () => {
  it('registered the service', () => {
    const service = app.service('performances');

    assert.ok(service, 'Registered the service');
  });
});
