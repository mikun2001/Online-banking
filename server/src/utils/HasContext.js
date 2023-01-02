/**
 *
 * @return {function(*): boolean}
 * @constructor
 */
const HasContext = (name, value) => (context) => {
    const { params } = context;

    if (!params) return false;

    const { query } = params;

    if (!query) return false;

    return context[name] === value;
};

export default HasContext;
