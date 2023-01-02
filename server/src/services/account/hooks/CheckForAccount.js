import { BadRequest } from '@feathersjs/errors';

const CheckForAccount = () => async (context) => {
    const { data, app } = context;

    const { user, accountType } = data;

    const accounts = await app
        .service('account')
        ._find({
            query: {
                user,
                status: { $ne: 0 },
            },
        })
        .then((res) => res.data);

    if (accounts.length === 2) throw new BadRequest('More accounts can not be created.');

    if (accounts.length && accounts[0].accountType === accountType)
        throw new BadRequest(`The user has already a ${accountType === 1 ? 'savings' : 'current'} account.`);

    return context;
};

export default CheckForAccount;
