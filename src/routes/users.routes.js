const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoute = Router()




const usercontroller = new UsersController();

usersRoute.post("/", usercontroller.create)

module.exports = usersRoute;