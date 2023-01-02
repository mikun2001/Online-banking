const OnAccountPatched = async (result, context) => {
    const { app } = context;

    const { user } = result;

    const accounts = await app
        .service('account')
        ._find({
            query: {
                user,
                status: 1,
            },
        })
        .then((res) => res.total);

    if (!accounts) {
        await app.service('user')._patch(user, {
            status: 2,
        });
    }
};

export default OnAccountPatched;
