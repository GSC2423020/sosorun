// NestJS의 "앱(서버) 생성기"를 가져온다
// → NestFactory가 실제 Nest 서버 인스턴스를 만들어 줌
import { NestFactory } from '@nestjs/core';

// 우리가 만든 루트 모듈(AppModule)을 가져온다
// → Nest는 "모듈" 단위로 컨트롤러/서비스 등을 묶어서 관리함
import { AppModule } from './app.module';


// 서버를 시작하는 함수 (비동기라 async 사용)
// → DB 연결, 서버 시작 같은 "기다려야 하는 작업"이 있기 때문
async function bootstrap() {

  // AppModule을 기반으로 Nest 애플리케이션(서버)을 생성한다
  // → 여기서부터 Nest가 라우팅/DI(의존성 주입) 등을 준비함
  const app = await NestFactory.create(AppModule);

  // 서버가 사용할 포트 번호를 정한다
  // 1순위: 환경변수 PORT (문자열이라 Number로 숫자로 변환)
  // 2순위: 없으면 기본값 3001 사용
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;

  // 서버를 실제로 실행한다
  // '0.0.0.0'은 "이 컴퓨터의 모든 네트워크(IP) 주소에서 접근 허용" 의미
  // → Docker(다른 컨테이너)/WSL/외부에서 접속하려면 보통 모든 인터페이스(0.0.0.0)로 바인딩함
  await app.listen(port, '0.0.0.0');

  // 서버가 켜졌는지 확인용 로그 출력
  console.log(`API listening on http://localhost:${port}`);
}

// bootstrap() 함수를 실행해서 서버를 시작한다
bootstrap();
