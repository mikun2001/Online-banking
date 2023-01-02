// Initializes the `account` service on path `/account`
import { Account } from './account.class';

import createModel from '../../models/account.model';
import hooks from './account.hooks';
import OnAccountPatched from './events/OnAccountPatched';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate', '$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/account', new Account(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('account');

    service.hooks(hooks);

    service.on('patched', OnAccountPatched);
    service.on('removed', OnAccountPatched);
}
