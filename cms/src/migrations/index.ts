import * as migration_20260618_122101_initial from './20260618_122101_initial';
import * as migration_20260618_133418_initial_setup from './20260618_133418_initial_setup';
import * as migration_20260619_182634 from './20260619_182634';

export const migrations = [
  {
    up: migration_20260618_122101_initial.up,
    down: migration_20260618_122101_initial.down,
    name: '20260618_122101_initial',
  },
  {
    up: migration_20260618_133418_initial_setup.up,
    down: migration_20260618_133418_initial_setup.down,
    name: '20260618_133418_initial_setup',
  },
  {
    up: migration_20260619_182634.up,
    down: migration_20260619_182634.down,
    name: '20260619_182634'
  },
];
