// Express(웹 서버 프레임워크) 라이브러리를 불러온다
// → Node.js 기본 http보다 훨씬 편하게 라우팅/응답을 만들 수 있음
const express = require("express");


// Express 앱(서버 본체)을 만든다
// → 앞으로 app.get, app.post 같은 걸로 “요청 처리 규칙”을 붙일 수 있음
const app = express();


// 서버가 사용할 포트 번호 설정
// 1순위: 환경변수 PORT (배포/도커에서 자주 지정)
// 2순위: 없으면 4000번 사용
const PORT = process.env.PORT || 4000;


// 클라이언트가 JSON으로 보낸 요청 body를 읽을 수 있게 해주는 설정
// 예) POST 요청에서 req.body를 쓰려면 이게 필요함
// (실무에서 거의 기본으로 항상 넣음)
app.use(express.json());


// GET /health 요청이 오면 실행되는 규칙(라우트)
// req: 요청 정보(누가, 어떤 주소로, 어떤 데이터로 요청했는지)
// res: 응답 보내는 도구
app.get("/health", (req, res) => {

  // JSON 형태로 응답을 보낸다
  // Express가 Content-Type 설정 + JSON 변환까지 알아서 처리해줌
  res.json({ ok: true });
});


// 서버를 PORT에서 실제로 실행(대기)시키는 코드
app.listen(PORT, () => {

  // 서버 실행이 성공하면 콘솔에 안내 문구 출력
  console.log(`API server running on http://localhost:${PORT}`);
});
