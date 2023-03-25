const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("./db");
const meetingsRouter = express.Router();

meetingsRouter.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  res.send(meetings);
});

meetingsRouter.post("/", (req, res, next) => {
  const meetingCreated = createMeeting();
  const newMeeting = addToDatabase("meetings", meetingCreated);
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  const deleted = deleteAllFromDatabase("meetings");
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = meetingsRouter;
