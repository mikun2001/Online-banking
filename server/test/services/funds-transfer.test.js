const app = require('../../src/app');

describe('\'funds-transfer\' service', () => {
  it('registered the service', () => {
    const service = app.service('funds-transfer');
    expect(service).toBeTruthy();
  });
});
