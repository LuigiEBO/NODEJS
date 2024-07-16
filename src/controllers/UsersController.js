const appError = require("../utils/appError");

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if(!name) {
      throw new appError("O nome e obrigatorio")
    }
    response.status(201).json({ name, email, password })
  }
  /* 
  index - GET para listar varios registros;
  show - GET para exibir um usario específico;
  create - POST criar registros;
  update - PUT para atualizar um registro;
  delete - DELETE remover um registro.
  */
}
module.exports = UsersController;