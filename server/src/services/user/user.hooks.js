import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import Permit from '../../hooks/Permit';
import FRequired from '../../hooks/FRequired';
import CheckEmailOrPhone from '../../hooks/CheckEmailOrPhone';
import GenerateCustomerId from './hooks/GenerateCustomerId';
import { disallow, discard, iff } from 'feathers-hooks-common';
import setDefaultQuery from '../../hooks/setDefaultQuery';
import IsUser from '../../utils/IsUser';
import setId from '../../hooks/setId';
import HasData from '../../utils/HasData';
import patchDeleted from '../../hooks/patchDeleted';

const { authenticate } = feathersAuthentication.hooks;
const { protect, hashPassword } = local.hooks;

export default {
    before: {
        all: [],
        find: [authenticate('jwt'), setDefaultQuery('status', 1)],
        get: [authenticate('jwt')],
        create: [
            authenticate('jwt'),
            Permit('admin'),
            FRequired(['name', 'email', 'password', 'phone', 'address', 'aadhar', 'dob', 'gender']),
            iff(HasData('role', 2), disallow()),
            CheckEmailOrPhone(),
            GenerateCustomerId(),
            hashPassword('password', { strategy: 'customer' }),
        ],
        update: [disallow()],
        patch: [
            hashPassword('password', { strategy: 'customer' }),
            authenticate('jwt'),
            discard('customerId', 'aadhar', 'dob', 'gender', 'role'),
            iff(HasData('status', 2), Permit('admin')),
            iff(IsUser('user'), setId()),
        ],
        remove: [authenticate('jwt'), Permit('admin'), patchDeleted()],
    },

    after: {
        all: [protect('password')],
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
