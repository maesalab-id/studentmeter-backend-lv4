const assert = require('assert');
const app = require('../../src/app');

describe('\'majors\' service', () => {
  it('registered the service', () => {
    const service = app.service('majors');

    assert.ok(service, 'Registered the service');
  });
});
