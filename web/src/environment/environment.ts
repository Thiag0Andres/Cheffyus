import env from './environment.json';
import version from './version.json';

export const environment = { ...env, ...version };
