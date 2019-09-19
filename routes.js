const userController = require("./controllers/UserController");

const routes = [
  {
    method: "GET",
    path: "/users",
    handler: userController.index.bind(userController)
  },
  {
    method: "POST",
    path: "/users",
    handler: userController.create.bind(userController)
  },
  {
    method: "GET",
    path: /\/users\/([0-9a-z]+)/,
    handler: userController.show.bind(userController)
  },
  {
    method: "PUT",
    path: /\/users\/([0-9a-z]+)/,
    handler: userController.show.bind(userController)
  },
  {
    method: "DELETE",
    path: /\/users\/([0-9a-z]+)/,
    handler: userController.delete.bind(userController)
  }
];

module.exports = routes;
