const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./cards.service");

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list,
};
