// 에러 처리 전용 미들웨어를
// 다른 파일(index.js 등)에서 사용할 수 있게 내보낸다
module.exports = (err, req, res, next) => {

  // 서버 콘솔에 에러 내용을 출력
  // → 개발/운영 중 에러 원인 확인용 (클라이언트에는 안 보임)
  console.error(err);


  // 에러 객체에 status가 있으면 그 값을 사용
  // 없으면 기본값으로 500 (서버 내부 오류)
  const status = err.status || 500;


  // HTTP 상태 코드 설정 후 JSON 형태로 에러 응답 전송
  res.status(status).json({

    // 에러 메시지가 있으면 그걸 사용
    // 없으면 기본 메시지 "Internal Server Error"
    message: err.message || "Internal Server Error",
  });
};
