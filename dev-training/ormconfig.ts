import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgresql',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
