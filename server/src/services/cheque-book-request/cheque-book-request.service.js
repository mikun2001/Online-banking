// Initializes the `cheque-book-request` service on path `/cheque-book-request`
import { ChequeBookRequest } from './cheque-book-request.class';

import createModel from '../../models/cheque-book-request.model';
import hooks from './cheque-book-request.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate', '$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/cheque-book-request', new ChequeBookRequest(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('cheque-book-request');

    service.hooks(hooks);
}
