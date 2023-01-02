import app from './index';

export const AccountService = app.service("account");

export const getAllAccounts = (skip = 0, limit, search) => AccountService.find({
    query: {
        accountNumber: {
            $regex: `.*${search}.*`,
            $options: 'i',
        },
        $populate: 'user',
        $skip: skip,
        $limit: limit,
        status: 1,
    }
});

export const getParticularAccount = (accountNumber) => AccountService.find({
    query: {
        accountNumber: accountNumber
    }
})

export const createAccount = (user, accountType, ifsc, branch,  nomineeName, balance) =>
    AccountService.create({
        user,
        accountType,
        ifsc,
        branch,
        nomineeName,
        balance
    },{
        query:{
            $populate: 'user'
        }
    });

export const deleteAccount = (id) => AccountService.remove(id);