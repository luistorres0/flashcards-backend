const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./decks.service");

async function list(req, res, next){
    const data = await service.list();

    return res.json({data})
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}
