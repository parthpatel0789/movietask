const { MovieController: Controller } = require('../Controllers');
const UniversalFunctions = require('../Utils/UniversalFunction');
const Joi = require('joi');
const Config = require('../Config');

module.exports = [

    //add  movie
    {
        method: 'POST',
        path: '/api/movie',
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return UniversalFunctions.sendSuccess(null, await Controller.addEditMovie(request.payload, userData))
                }
                catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: 'edit movie API',
            tags: ['api'],
            auth: "UserAuth",
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    rating: Joi.number().required(),
                    cast: Joi.array().required(),
                    genre: Joi.string().required(),
                    releaseDate: Joi.string().required()
                }),
                failAction: UniversalFunctions.failActionFunction,
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

    //edit movie
    {
        method: 'POST',
        path: '/api/movie/{movieId}',
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    request.payload.movieId = request.params.movieId
                    return UniversalFunctions.sendSuccess(null, await Controller.addEditMovie(request.payload, userData))
                }
                catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: 'edit movie API',
            tags: ['api'],
            auth: "UserAuth",
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    rating: Joi.number().required(),
                    cast: Joi.array().required(),
                    genre: Joi.string().required(),
                    releaseDate: Joi.string().required()
                }),
                failAction: UniversalFunctions.failActionFunction,
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

    //fetch movies
    {
        method: 'GET',
        path: '/api/movie',
        config: {
            handler: async function (request, h) {
                try {
                    return UniversalFunctions.sendSuccess(null, await Controller.fetchMovies())
                }
                catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: 'get Movies API',
            auth: "UserAuth",
            tags: ['api'],
            validate: {
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction,
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

    //delete movie
    {
        method: "DELETE",
        path: "/api/movie/{movieId}",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.deleteMovieById(request.params)
                    );
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Delete movie by id",
            auth: "UserAuth",
            tags: ["api"],
            validate: {
                params: Joi.object({
                    movieId: Joi.string().required()
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction,
            },
            plugins: {
                "hapi-swagger": {
                    payloadType: "form",
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages,
                },
            },
        },
    }
]