const SetAccountsQuery = () => async (context) => {
    const { params, app } = context;

    const { query, user } = params;

    const allAccounts = await app.service('account')._find({
        query: {
            user: user._id,
        },
        paginate: false,
    });

    const accountIds = allAccounts.map((each) => each._id);

    const accountNumbers = allAccounts.map((each) => each.accountNumber);

    query.$or = [{ account: { $in: accountIds } }, { 'receiver.accountNumber': { $in: accountNumbers } }];
};

export default SetAccountsQuery;
