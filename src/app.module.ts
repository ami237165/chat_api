import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { RegisterationModule } from './registration/registration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Your MySQL username
      password: '%48@SANPADAa', // Your MySQL password
      database: 'mychatapp', // Your database name
      entities: [User],
      synchronize: true, // Auto-create tables (for development only)
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    EventsModule,UsersModule,AuthModule,RegisterationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
