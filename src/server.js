const express = require('express');
const app = express();
const PORT = 3333;
app.get("/message/:id/:user", (request, response) => {
  const {id, user} = request.params;
  response.send(`Id da mensagem ${id}. Para o Usuário ${user}`)
})
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));