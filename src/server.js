require("express-async-errors")
const appError = require("./utils/appError")
const express = require('express');

const routes = require("./routes")
const app = express();
app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  if(error instanceof appError) {
    return response.status(error.statuscode).json({
      status: "error",
      message: error.message
    })
  }

  consoler.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  })
})


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));