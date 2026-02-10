// Express 웹 서버 프레임워크를 불러온다
// → 서버 생성, 라우팅, 미들웨어 처리를 담당
const express = require("express");

// CORS 라이브러리 불러오기
// → 다른 출처(포트/도메인)에서 오는 요청을 허용하기 위해 필요
const cors = require("cors");

// .env 파일에 있는 환경 변수를 process.env로 읽을 수 있게 설정
// → PORT, DB 정보 등 민감한 설정을 코드 밖으로 분리
require("dotenv").config();


// /health 요청을 담당하는 라우터 파일 불러오기
// → 실제 요청 처리 로직은 routes 폴더에 있음
const healthRouter = require("./routes/health.route");


// 404(Not Found) 처리 미들웨어 불러오기
// → 어떤 라우트에도 걸리지 않았을 때 실행됨
const notFound = require("./middlewares/notFound");


// 에러 처리 전용 미들웨어 불러오기
// → 서버에서 발생한 모든 에러를 여기서 처리
const errorHandler = require("./middlewares/errorHandler");


// Express 앱(서버 본체) 생성
const app = express();


// 서버가 사용할 포트 번호 설정
// 1순위: .env 파일 또는 배포 환경에서 지정한 PORT
// 2순위: 없으면 4000번 포트 사용
const PORT = process.env.PORT || 4000;


// ===== 기본 미들웨어 설정 =====

// 클라이언트가 JSON으로 보낸 요청 body를 읽을 수 있게 해줌
// → POST / PUT 요청에서 req.body 사용 가능
app.use(express.json());


// CORS 설정
// → http://localhost:3000 (Next.js) 에서 오는 요청만 허용
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


// ===== 라우터 등록 =====

// healthRouter 안에 정의된 모든 라우트를 서버에 연결
// 예: GET /health
app.use(healthRouter);


// ===== 에러 처리 (항상 맨 마지막) =====

// 어떤 라우트에도 걸리지 않은 요청 → 404 처리
app.use(notFound);

// 라우터나 미들웨어에서 발생한 에러 처리
app.use(errorHandler);


// 서버를 실제로 실행 (요청 대기 상태로 진입)
app.listen(PORT, () => {

  // 서버가 정상적으로 실행되었을 때 콘솔에 출력
  console.log(`API server running on http://localhost:${PORT}`);
});
