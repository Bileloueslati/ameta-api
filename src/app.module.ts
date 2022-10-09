import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SheetModule } from './sheet/sheet.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompagnyModule } from './compagny/compagny.module';
import { PaginateModule } from 'nestjs-sequelize-paginate';
import { SheetContainerModule } from './sheet-container/sheet-container.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    SheetModule,
    ForgetPasswordModule,
    PaginateModule.forRoot({
      showUrl: true,
      url: 'http://localhost:3000',
      defaultOffset: 25,
    }),
    CompagnyModule,
    SheetContainerModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    MailModule,
    ResetPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
