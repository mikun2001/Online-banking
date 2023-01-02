// Initializes the `funds-transfer` service on path `/funds-transfer`
import { FundsTransfer } from './funds-transfer.class';

import createModel from '../../models/funds-transfer.model';
import hooks from './funds-transfer.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate', '$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/funds-transfer', new FundsTransfer(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('funds-transfer');

    service.hooks(hooks);
}
