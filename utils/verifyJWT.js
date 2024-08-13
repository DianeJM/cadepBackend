const jwt = require("jsonwebtoken");
const { errorResponse } = require("./responses");
require("dotenv").config();

module.exports.verifyJWT = (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    if (headers) {
      const token = headers.split(" ")[1];
      const response = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        function (err, data) {
          if (err) {
            res.status(401).json({
              status: false,
              message: "Unauthorized",
            });
          } else {
            req.user = data;
            next();
          }
        }
      );
    } else {
      res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    errorResponse(res, error);
  }
};
