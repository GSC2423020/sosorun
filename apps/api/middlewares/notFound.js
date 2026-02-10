// 이 파일에서 정의한 함수를
// 다른 파일(index.js 등)에서 사용할 수 있게 내보낸다
module.exports = (req, res, next) => {

  // HTTP 상태 코드를 404 (요청한 주소를 찾을 수 없음)으로 설정
  res.status(404).json({

    // 클라이언트에게 보여줄 에러 메시지
    message: "Not Found",

    // 사용자가 실제로 요청한 주소(URL)
    // 예: /abc, /api/users/123 등
    path: req.originalUrl,
  });
};
