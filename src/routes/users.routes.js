const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoute = Router()


function myMiddlewere(request, response, next) {
  console.log("Você passou pelo middlewere")
  if(!request.body.isAdmin) {
    return response.json("User not unauthorized")
  };
  next();
}

const usercontroller = new UsersController();

usersRoute.post("/", myMiddlewere, usercontroller.create)

module.exports = usersRoute;