import axios from "axios";
let middleware = {
  addCreateAt(req, res, next) {
    if (!req.body.createAt) {
      req.body.createdAt = new Date();
    }
    next();
  },
  async handleNotificationVehicle(req, res, next) {
    const response = await axios.get("http://localhost:5000/webhook");
    next();
  },
};
export { middleware };
