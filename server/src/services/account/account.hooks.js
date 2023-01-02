import * as feathersAuthentication from '@feathersjs/authentication';
import Permit from '../../hooks/Permit';
import FRequired from '../../hooks/FRequired';
import GenerateAccountNumber from './hooks/GenerateAccountNumber';
import { disallow, discard, iff } from 'feathers-hooks-common';
import patchDeleted from '../../hooks/patchDeleted';
import setDefaultQuery from '../../hooks/setDefaultQuery';
import IsUser from '../../utils/IsUser';
import setCreatedByQuery from '../../hooks/setCreatedByQuery';
import CheckForAccount from './hooks/CheckForAccount';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [iff(IsUser('user'), setCreatedByQuery('user')), setDefaultQuery('status', 1)],
        get: [iff(IsUser('user'), setCreatedByQuery('user')), setDefaultQuery('status', 1)],
        create: [
            Permit('admin'),
            FRequired(['user', 'accountType', 'ifsc', 'branch', 'nomineeName']),
            GenerateAccountNumber(),
            CheckForAccount(),
        ],
        update: [disallow()],
        patch: [Permit('admin'), setDefaultQuery('status', 1), discard('accountNumber', 'accountType')],
        remove: [Permit('admin'), patchDeleted()],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
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
