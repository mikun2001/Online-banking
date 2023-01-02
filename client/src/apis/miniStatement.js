import app from './index';

const miniStatementService = app.service('/funds-transfer');

export const getMiniStatement = () => miniStatementService.find({
    query: {
        $skip: 0,
        $limit: 10,
        $populate: ['account','user', "account.user"]
    }
})