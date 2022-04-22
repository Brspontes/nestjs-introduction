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
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgresql',
      database: 'cursonestjs',
      autoLoadEntities: false,
      entities: [__dirname + '/**/*.entity.ts'],
      synchronize: false, //nunca usar essa porra em produção
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
