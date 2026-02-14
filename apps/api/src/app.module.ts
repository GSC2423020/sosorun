import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // .env 로드용
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // apps/api/.env를 읽어서 process.env에 넣어줌
    ConfigModule.forRoot({
      isGlobal: true, // 어디서든 Config 사용 가능
      envFilePath: '.env', // apps/api 기준의 .env
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
