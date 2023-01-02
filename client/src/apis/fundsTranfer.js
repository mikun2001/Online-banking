import app from './index';

const fundsTransferService = app.service('/funds-transfer');

export const createFundsTransfer = (account, name, accountNumber, ifsc, amount) => fundsTransferService.create({
    account,
    receiver:{
        name,
        accountNumber,
        ifsc
    },
    amount
});

