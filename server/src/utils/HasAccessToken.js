/**
 *
 * @return {function(*): boolean}
 * @constructor
 */
const HasAccessToken = () => (context) => {
    const { params } = context;

    const { authentication } = params;

    return authentication !== undefined;
};

export default HasAccessToken;
