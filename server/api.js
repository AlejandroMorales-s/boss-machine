const express = require("express");
const apiRouter = express.Router();

//* api/ideas
apiRouter.use("/ideas", require("./ideas"));

//* api/minions
apiRouter.use("/minions", require("./minions"));

//* api/meetings
apiRouter.use("/meetings", require("./meetings"));

module.exports = apiRouter;
