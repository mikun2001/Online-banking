const AddBalanceToAccount = () => async (context) => {
    const { app, result } = context;

    const { receiver, amount } = result;

    const { accountNumber } = receiver;

    const accountData = await app
        .service('account')
        ._find({
            query: {
                accountNumber,
                $limit: 1,
            },
        })
        .then((res) => (res.total ? res.data[0] : null));

    if (accountData) {
        await app.service('account')._patch(accountData._id, {
            $inc: {
                balance: amount,
            },
        });
    }

    return context;
};

export default AddBalanceToAccount;
