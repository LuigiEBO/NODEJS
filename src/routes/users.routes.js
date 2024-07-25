const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoute = Router()


function myMiddlewere(request, response, next) {
  console.log("Você passou pelo middlewere")
  next();
}

const usercontroller = new UsersController();

usersRoute.post("/", myMiddlewere, usercontroller.create);
usersRoute.put("/:id", usercontroller.update);

module.exports = usersRoute;