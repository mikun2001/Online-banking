import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, discard, iff } from 'feathers-hooks-common';
import IsUser from '../../utils/IsUser';
import setCreatedByQuery from '../../hooks/setCreatedByQuery';
import Permit from '../../hooks/Permit';
import setCreatedBy from '../../hooks/setCreatedBy';
import FRequired from '../../hooks/FRequired';
import CheckAccountBelongsToUser from './hooks/CheckAccountBelongsToUser';
import patchDeleted from '../../hooks/patchDeleted';
import setDefaultItem from '../../hooks/setDefaultItem';
import setDefaultQuery from '../../hooks/setDefaultQuery';
import HasData from '../../utils/HasData';
import IncreaseRequestCount from './hooks/IncreaseRequestCount';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [iff(IsUser('user'), setCreatedByQuery()), setDefaultQuery('status', { $ne: 0 })],
        get: [disallow()],
        create: [
            Permit('user'),
            setCreatedBy(),
            FRequired(['account']),
            CheckAccountBelongsToUser(),
            discard('status', 'approvedOrRejectedBy', 'approvedOrRejectedOn', 'message'),
        ],
        update: [disallow()],
        patch: [
            Permit('admin'),
            setCreatedBy('approvedOrRejectedBy'),
            setDefaultItem('approvedOrRejectedOn', Date.now()),
            iff(HasData('status', 3), FRequired(['message'])),
            setDefaultQuery('status', 1),
        ],
        remove: [iff(IsUser('user'), setCreatedByQuery()), patchDeleted(), setDefaultQuery('status', { $ne: 0 })],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [IncreaseRequestCount()],
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
