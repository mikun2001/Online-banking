/**
 *
 * @returns {function(...[*]=)}
 */
const setId = () => (context) => {
    const { params } = context;
    if (!params.user) return context;

    context.id = params.user._id;

    return context;
};

export default setId;
