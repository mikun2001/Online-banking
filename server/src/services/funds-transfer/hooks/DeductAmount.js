const DeductAmount = () => async (context) => {
    const { result, app } = context;

    const { account, amount } = result;

    await app.service('account')._patch(account, {
        $inc: {
            balance: amount * -1,
        },
    });
};

export default DeductAmount;
