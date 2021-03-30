import App from './src/App';
import ormconfig from './ormconfig';

process.env.JWT_EXPIRY = '3600';
process.env.JWT_SECRET = 'test';
export const createTestApp = async () => App(ormconfig as any, false);
