const rooms = require("./rooms");

const configRoutes = app => {
  app.use("/rooms", rooms);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not Found!" });
  });
};

module.exports = configRoutes;
