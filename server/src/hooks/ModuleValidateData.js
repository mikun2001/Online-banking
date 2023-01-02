import { BadRequest } from '@feathersjs/errors';

const ModuleValidateData = (serviceName, key, query = { status: 1 }) => async (context) => {
    const { data, app } = context;

    const service = app.service(serviceName);

    const id = data[key];

    if (!id) return context;

    const result = await service._get(id, { query }).catch(() => null);

    if (!result) throw new BadRequest(`Invalid value of ${key}`);

    data[`${key}Data`] = result;

    return context;
};

ModuleValidateData.isUser = (key = 'user', query) => ModuleValidateData('v1/user', key, query);
ModuleValidateData.isCar = (key = 'car', query) => ModuleValidateData('v1/car', key, query);
ModuleValidateData.isRide = (key = 'ride', query) => ModuleValidateData('v1/ride', key, query);

export default ModuleValidateData;
