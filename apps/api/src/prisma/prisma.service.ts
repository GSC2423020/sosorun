// PrismaService는 NestJS에서 Prisma Client를 "주입"해서 쓰기 위한 클래스입니다.
// - 앱이 종료될 때 DB 연결도 깔끔하게 닫아줄 수 있습니다.
// Prisma v7+에서는 PrismaClient를 만들 때 "adapter" 또는 "accelerateUrl"이 필수입니다.

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Postgres 연결 문자열을 환경변수에서 읽음
    const connectionString = process.env.DATABASE_URL;

    // 연결 문자열이 비어있으면 바로 에러를 내서 원인 파악을 쉽게 함
    if (!connectionString) {
      throw new Error('DATABASE_URL is missing. Check apps/api/.env');
    }

    // Prisma v7 정석: adapter를 만들어서 PrismaClient에 전달
    const adapter = new PrismaPg({ connectionString });

    // super()에 옵션을 반드시 넘겨야 함 (v7+)
    super({ adapter });
  }

  // 모듈이 시작될 때 실행되는 함수
  async onModuleInit() {
    // DB에 연결
    await this.$connect();
  }

  // 모듈이 종료될 때 실행되는 함수
  async onModuleDestroy() {
    // DB 연결 종료
    await this.$disconnect();
  }
}
