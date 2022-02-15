const UnAuthorizedException = require("../../common/exceptions/unauthorized.exception");

const authGuard = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      throw new UnAuthorizedException();
    }
  };
};

module.exports = authGuard;
