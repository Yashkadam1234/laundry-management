module.exports = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "Invalid request" });
  }
  next();
};