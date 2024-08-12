const successResponse = (res, data) => {
  res.status(200).json({
    status: true,
    data,
  });
};
const errorResponse = (res, error) => {
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error,
  });
};

module.exports = { successResponse, errorResponse };
