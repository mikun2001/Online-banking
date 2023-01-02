import generateCode from '../../../utils/generateCode';

const GenerateTransactionNumber = () => async (context) => {
    const { data, app } = context;

    let code = await generateCode(app, 'funds-transfer', 'transactionCode', 10);

    data.transactionCode = `TRXN${code}`;

    return context;
};

export default GenerateTransactionNumber;
