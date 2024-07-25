const {hash, compare} = require('bcryptjs')
const appError = require("../utils/appError");

const sqliteConection = require('../database/sqlite');
const { response } = require('express');
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists) {
      throw new appError('Este email ja esta em uso.')
    }
    
    const hashedPassword = await hash(password, 8);
    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return response.status(201).json();
  /* 
  index - GET para listar varios registros;
  show - GET para exibir um usario específico;
  create - POST criar registros;
  update - PUT para atualizar um registro;
  delete - DELETE remover um registro.
  */
}
  async update(request, response) {
    const {name, email, password, old_password} = request.body;
    const {id } =  request.params;

    const database = await sqliteConection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);
    if(!user) {
      throw new appError('Usuario não encontrado')
    }
    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new appError('Este email ja esta em uso')
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw  new appError("Você precisa informar sua antiga senha para cadastrar uma nova")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new appError('A senha antiga está errada.')
      }

      user.password = await hash(password, 8)
    }

    await database.run(`UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password,  id]
    );
    return response.status(200).json();
  }
}
module.exports = UsersController;