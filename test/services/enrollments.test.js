const assert = require('assert');
const app = require('../../src/app');

describe('\'enrollments\' service', () => {
  it('registered the service', () => {
    const service = app.service('enrollments');

    assert.ok(service, 'Registered the service');
  });
});
