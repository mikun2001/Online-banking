import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
import GetAllBankAccounts from './hooks/GetAllBankAccounts';

export default (app) => {
    const authentication = new AuthenticationService(app);

    authentication.register('jwt', new JWTStrategy());
    authentication.register('email', new LocalStrategy());
    authentication.register('customer', new LocalStrategy());

    app.use('/authentication', authentication);

    const service = app.service('authentication');

    service.hooks({
        after: {
            create: [GetAllBankAccounts()],
        },
    });

    app.configure(expressOauth());
};
