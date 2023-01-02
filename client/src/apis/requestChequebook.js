import app from './index';

const chequebookService = app.service('/cheque-book-request')

export const requestChequebook = (account) => chequebookService.create({account});

export const getAllRequests = (skip = 0, limit) => chequebookService.find({
    query:{
        // status: 1,
        $skip: skip,
        $limit: limit,
        $populate: ['account', 'user']
    }
})

export const deleteRequest = (id, status, message) => chequebookService.patch(id, {status, message});