let middleware = {
  addCreateAt(req, res, next) {
    if (!req.body.createAt) {
      req.body.createdAt = new Date();
    }
    next();
  },
};
export { middleware };
