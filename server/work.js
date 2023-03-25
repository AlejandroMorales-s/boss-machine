const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getFromDatabaseById,
} = require("./db");
const workRouter = express.Router({ mergeParams: true });

workRouter.param("workId", (req, res, next, id) => {
  const minionId = req.params.minionId;
  const work = getFromDatabaseById("work", id);
  if (work.minionId !== minionId) {
    res.status(400).send();
  } else {
    next();
  }
});

workRouter.get("/", (req, res, next) => {
  const work = getAllFromDatabase("work");
  const minionWork = work.filter(
    (item) => item.minionId === req.params.minionId
  );
  res.send(minionWork);
});

workRouter.post("/", (req, res, next) => {
  const newWork = addToDatabase("work", req.body);
  res.status(201).send(newWork);
});

workRouter.put("/:workId", (req, res, next) => {
  const updatedWork = updateInstanceInDatabase("work", req.body);
  if (updatedWork) {
    res.send(updatedWork);
  } else {
    res.status(404).send();
  }
});

workRouter.delete("/:workId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("work", req.params.workId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
