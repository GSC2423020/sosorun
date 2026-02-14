// PrismaModule은 PrismaService를 다른 모듈에서도 쓸 수 있게 export 해주는 역할입니다.

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Nest 컨테이너에 PrismaService 등록
  exports: [PrismaService],   // 다른 모듈에서도 import해서 사용 가능
})
export class PrismaModule {}
