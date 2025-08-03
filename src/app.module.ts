import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { RegisterationModule } from './registration/registration.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
       host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [User],
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    EventsModule,UsersModule,AuthModule,RegisterationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
