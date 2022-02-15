const { validationResult } = require("express-validator");

const reqWrapper = (handler) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array(),
          response: null,
        });
      }
      const response = await handler(req, res, next);
      const _response = {
        success: true,
        error: null,
        response,
      };
      res.json(_response);
    } catch (e) {
      next(e);
    }
  };
};

module.exports = reqWrapper;
