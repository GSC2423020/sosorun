/*
< Node.js로 “아주 최소한의 HTTP 서버”를 띄우는 예제 >
  
  “서버가 요청을 받고 응답한다”는 원리 이해용
    
    - 이 서버가 하는 일
      브라우저나 클라이언트 요청을 직접 받아서, 조건에 따라 JSON 응답을 돌려주는, Node.js 순정 HTTP 서버(가장 바닥)
        
    - '/health'는 왜 있나?
      서버가 살아있는지 확인하는 용도로, 실무에서 엄청 자주 씀.
*/


// Node.js에 기본으로 들어있는 http 모듈을 불러온다
// → 웹 서버를 만들기 위해 꼭 필요함
const http = require("http");


// 서버가 사용할 포트 번호를 정한다
// 1순위: 환경변수 PORT (배포 환경에서 자주 사용)
// 2순위: 없으면 4000번 포트 사용
const PORT = process.env.PORT || 4000;


// 실제 서버를 생성한다
// (req, res)는 요청(request)과 응답(response)
const server = http.createServer((req, res) => {

  // ===== 라우팅(요청 주소에 따라 처리 나누기) =====

  // 요청 방식이 GET 이고
  // 요청 주소가 /health 인 경우
  if (req.method === "GET" && req.url === "/health") {

    // HTTP 상태 코드 200 (정상)
    // 응답 데이터는 JSON 형식이라고 알려줌
    res.writeHead(200, { "Content-Type": "application/json" });

    // 실제 응답 내용 보내기
    // { ok: true } 를 JSON 문자열로 변환해서 전송
    res.end(JSON.stringify({ ok: true }));

    // 여기서 함수 종료 (아래 코드 실행 안 함)
    return;
  }

  // 위 조건에 해당하지 않는 모든 요청은 여기로 옴

  // HTTP 상태 코드 404 (찾을 수 없음)
  res.writeHead(404, { "Content-Type": "application/json" });

  // 에러 메시지 응답
  res.end(JSON.stringify({ message: "Not Found" }));
});


// 서버를 지정한 PORT 번호로 실행한다
server.listen(PORT, () => {

  // 서버가 정상적으로 실행되면 콘솔에 출력
  console.log(`Server running on http://localhost:${PORT}`);
});
