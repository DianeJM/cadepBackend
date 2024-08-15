module.exports.getUrl = (req) => {
  return "http://localhost:50/" + req.file.path;
};
