import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, iff } from 'feathers-hooks-common';
import IsUser from '../../utils/IsUser';
import SetAccountsQuery from './hooks/SetAccountsQuery';
import Permit from '../../hooks/Permit';
import setCreatedBy from '../../hooks/setCreatedBy';
import GenerateTransactionNumber from './hooks/GenerateTransactionNumber';
import ValidateBalance from './hooks/ValidateBalance';
import DeductAmount from './hooks/DeductAmount';
import AddBalanceToAccount from './hooks/AddBalanceToAccount';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [iff(IsUser('user'), SetAccountsQuery())],
        get: [],
        create: [Permit('user'), setCreatedBy('user'), GenerateTransactionNumber(), ValidateBalance()],
        update: [disallow()],
        patch: [disallow()],
        remove: [disallow()],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [DeductAmount(), AddBalanceToAccount()],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
