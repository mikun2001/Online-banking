const app = require('../../src/app');

describe("'cheque-book-request' service", () => {
    it('registered the service', () => {
        const service = app.service('cheque-book-request');
        expect(service).toBeTruthy();
    });
});
