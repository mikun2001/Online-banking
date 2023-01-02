import { BadRequest, NotAuthenticated, NotFound } from '@feathersjs/errors';

const CatchCustomError = () => async (context) => {
    const { result } = context;
    const { result: res, message, code } = result;

    if (!res) {
        switch (code) {
            case 400:
                throw new BadRequest(message);
            case 401:
                throw new NotAuthenticated('Invalid Login');
            case 404:
                throw new NotFound(message);
        }
    }

    return context;
};

export default CatchCustomError;
