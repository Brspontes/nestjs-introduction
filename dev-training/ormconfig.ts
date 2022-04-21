import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5440,
  username: 'postgres',
  password: 'postgresql',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
