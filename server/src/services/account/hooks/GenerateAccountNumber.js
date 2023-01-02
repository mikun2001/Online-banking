import generateCode from '../../../utils/generateCode';

const GenerateAccountNumber = () => async (context) => {
    const { data, app } = context;

    const { accountType, balance } = data;

    data.accountNumber = await generateCode(app, 'account', 'accountNumber', 15);

    if (!balance) {
        data.balance = accountType === 1 ? 1000 : 5000;
    }

    return context;
};
export default GenerateAccountNumber;
