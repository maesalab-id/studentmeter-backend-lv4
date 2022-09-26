const assert = require('assert');
const app = require('../../src/app');

describe('\'attendances\' service', () => {
  it('registered the service', () => {
    const service = app.service('attendances');

    assert.ok(service, 'Registered the service');
  });
});
