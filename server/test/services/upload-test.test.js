const app = require('../../src/app');

describe("'upload-test' service", () => {
    it('registered the service', () => {
        const service = app.service('upload-test');
        expect(service).toBeTruthy();
    });
});
