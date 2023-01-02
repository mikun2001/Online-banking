import { BadRequest } from '@feathersjs/errors';

const CheckAccountBelongsToUser = () => async (context) => {
    const { data, app } = context;

    const { user, account } = data;

    await app
        .service('account')
        ._get(account, {
            query: {
                user,
                status: 1,
            },
        })
        .catch(() => {
            throw new BadRequest('Invalid account given for cheque book request.');
        });

    const requestExists = await app
        .service('cheque-book-request')
        ._find({
            query: {
                user,
                account,
                status: 1,
                $limit: 1,
            },
        })
        .then((res) => res.total);

    if (requestExists) throw new BadRequest('Your request of cheque book for this account already in pending.');
};

export default CheckAccountBelongsToUser;
