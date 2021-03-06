import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [AuthController],
    imports: [
        ConfigModule.forRoot(),
        UsersModule, 
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, MailService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
