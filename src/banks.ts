import {BelfiusBe} from './banks/belfius-be';
import {SparkasseGerman} from './banks/sparkasse-german';
import {ZkbGerman} from './banks/zkb-german';

export const supportedBanks = {
    'sparkasse-german': SparkasseGerman,
    'zkb-german': ZkbGerman,
    'belfius-be': BelfiusBe,
};
