import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/dto/user.dto';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: '12345', 
      database: 'nestjs_user', 
      entities: [User], 
      synchronize: true, 
    }),ProductModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 