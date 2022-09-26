const assert = require('assert');
const app = require('../../src/app');

describe('\'study-programs\' service', () => {
  it('registered the service', () => {
    const service = app.service('study-programs');

    assert.ok(service, 'Registered the service');
  });
});
