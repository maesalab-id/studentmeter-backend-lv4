const assert = require('assert');
const app = require('../../src/app');

describe('\'subject-lecturers\' service', () => {
  it('registered the service', () => {
    const service = app.service('subject-lecturers');

    assert.ok(service, 'Registered the service');
  });
});
