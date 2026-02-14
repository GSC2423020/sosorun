import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // API가 살아있는지 확인하는 기본 헬스체크
  @Get('/health')
  health() {
    return { ok: true };
  }

  // DB 연결이 살아있는지 확인하는 헬스체크
  @Get('/health/db')
  async healthDb() {
    // SELECT 1 쿼리를 던져서 DB 응답이 오면 OK로 판단
    await this.prisma.$queryRaw`SELECT 1`;
    return { ok: true, db: 'connected' };
  }
}
