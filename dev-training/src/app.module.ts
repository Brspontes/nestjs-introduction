import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5440,
      username: 'postgres',
      password: 'postgresql',
      database: 'postgres',
      autoLoadEntities: true,
      entities: ['dist/**/*.entity.js'],
      migrations: ['src/migrations/*.ts'],
      //synchronize: true, nunca usar essa porra em produção
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
