import axios from "axios";
let middleware = {
  addCreateAt(req, res, next) {
    if (!req.body.createAt) {
      req.body.createdAt = new Date();
    }
    next();
  },
  async handleNotificationVehicle(req, res, next) {
    try {
      axios.get("http://localhost:5000/webhook");
      console.log("da goi api");
    } catch (error) {
      console.error("Error calling API:", error);
    }
    next();
  },
};
export { middleware };
