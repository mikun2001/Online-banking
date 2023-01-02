import generateCode from '../../../utils/generateCode';

const GenerateCustomerId = () => async (context) => {
    const { data, app } = context;

    data.customerId = await generateCode(app, 'user', 'customerId', 8);
};

export default GenerateCustomerId;
