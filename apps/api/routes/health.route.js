// Express 라이브러리를 불러온다
// → 라우터 객체를 만들기 위해 필요함
const express = require("express");


// Express에서 제공하는 Router(라우터) 객체 생성
// → '라우트만 담당하는 작은 서버 조각'이라고 생각하면 됨
const router = express.Router();


// GET /health 요청이 들어왔을 때 실행될 처리
// ※ 이 파일은 '라우터 파일'이므로 서버 실행은 안 함
router.get("/health", (req, res) => {

  // JSON 형태로 응답 반환
  // { ok: true } → 서버가 정상이라는 신호
  res.json({ ok: true });
});


// 이 라우터를 다른 파일(index.js 등)에서
// require()로 가져다 쓸 수 있게 내보냄
module.exports = router;
