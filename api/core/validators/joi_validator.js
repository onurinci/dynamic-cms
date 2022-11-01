const joi_validator = (schema) => {
  return async (req, res, next) => {

    try {
      if (req.method == "POST")
        await schema.validateAsync(req.body);
      else if (req.method == "GET")
        await schema.validateAsync(req.query);
      next();
    }
    catch (err) {
      console.log("joi validation err => ", err);
      return res.status(400).json({
        status: false,
        validate_error: true,
        message: err.message ?? '-'
      });
    }

  }
}
module.exports = joi_validator;