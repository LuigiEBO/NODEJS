const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoute = Router()


const notesController = new NotesController();

notesRoute.get("/", notesController.index);
notesRoute.post("/:user_id", notesController.create);
notesRoute.get("/:id", notesController.show);
notesRoute.delete("/:id", notesController.delete);

module.exports = notesRoute;