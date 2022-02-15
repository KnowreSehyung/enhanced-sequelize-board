const HttpException = require("./http.exception");

class UnAuthorizedException extends HttpException {
  constructor(message = "인증이 유효하지 않습니다.") {
    super(401, message);
  }
}

module.exports = UnAuthorizedException;
