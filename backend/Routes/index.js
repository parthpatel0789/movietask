const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const all = [].concat(userRoutes, movieRoutes);

module.exports = all;