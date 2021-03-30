const env = process.env.NODE_ENV || 'dev';

export = {
  type: 'sqlite',
  database: env === 'test' ? ':memory:' : '../db/' + env + '.db',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
};
