import app from './index';

export const authenticate = (customerId, password) => app.authenticate({
    strategy: 'customer',
    customerId,
    password
});

export const logout = app.logout;
