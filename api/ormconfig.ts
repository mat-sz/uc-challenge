const env = process.env.NODE_ENV || 'dev';

export = {
  type: 'sqlite',
  database: '../db/' + env + '.db',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.ts'],
};
