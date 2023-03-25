const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const workRouter = require("./work");
const minionsRouter = express.Router();

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  res.send(minions);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  if (!req.body.id || req.body.id !== req.params.minionId)
    req.body.id = req.params.minionId;

  const minion = updateInstanceInDatabase("minions", req.body);

  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

minionsRouter.use("/:minionId/work", workRouter);

module.exports = minionsRouter;
