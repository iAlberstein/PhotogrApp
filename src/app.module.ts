import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import Middleware from './middleware/middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config:ConfigService) =>  ({
      uri: config.get<string>("MONGO_URL"),
    })
  }), ProductsModule, CartsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes({path: "*", method: RequestMethod.ALL})
  } 
}