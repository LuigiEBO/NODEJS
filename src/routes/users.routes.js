const { Router } = require("express");



const usersRoute = Router()

usersRoute.post("/", (request, response) => {
  const { name, email, password } = request.body
  response.json({ name, email, password })
})

module.exports = usersRoute;