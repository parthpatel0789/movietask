const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//add edit movie
async function addEditMovie(payloadData, userData) {
    try {
        payloadData.addedBy = userData._id
        let movie
        if (payloadData.movieId) {
            if (await Service.findOne(Model.Movies, { name: payloadData.name, _id: { $ne: payloadData.movieId } })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.MOVIE_ALREADY_EXISTS);
            }
            movie = await Service.findAndUpdate(
                Model.Movies,
                { _id: payloadData.movieId },
                payloadData,
                { new: true }
            );
            if (!movie)
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
            return movie
        } else {
            if (await Service.findOne(Model.Movies, { name: payloadData.name })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.MOVIE_ALREADY_EXISTS);
            }
            movie = await Service.saveData(Model.Movies, payloadData)
            if (!movie) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
            }
            return movie
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//fetch movies
async function fetchMovies() {
    try {
        let options = { sort: { _id: -1 } };
        return await Service.getData(Model.Movies, {}, {}, options)
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//delete movie
async function deleteMovieById(paramsData) {
    try {
        const { movieId } = paramsData;
        const resp = await Service.remove(
            Model.Movies,
            { _id: movieId }
        );
        if (resp) return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DELETED;
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
    } catch (err) {
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

module.exports = {
    addEditMovie,
    fetchMovies,
    deleteMovieById
}

