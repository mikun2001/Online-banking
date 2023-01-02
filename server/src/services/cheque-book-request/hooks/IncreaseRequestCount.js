const IncreaseRequestCount = () => async (context) => {
    const { app, result } = context;

    const { user } = result;

    await app.service('user')._patch(user, {
        $inc: {
            requestCount: 1,
        },
    });
};

export default IncreaseRequestCount;
