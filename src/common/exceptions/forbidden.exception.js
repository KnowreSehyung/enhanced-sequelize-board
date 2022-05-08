const HttpException = require("./http.exception");

class ForbiddenEception extends HttpException {
  constructor(message = "접근 권한이 없습니다.") {
    super(403, message);
  }
}

module.exports = ForbiddenEception;
//test