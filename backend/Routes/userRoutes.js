const { UserController: Controller } = require('../Controllers');
const UniversalFunctions = require('../Utils/UniversalFunction');
const Joi = require('joi');
const Config = require('../Config');

module.exports = [

    //user register
    {
        method: 'POST',
        path: '/api/register',
        config: {
            handler: async function (request, h) {
                try {
                    return UniversalFunctions.sendSuccess(null, await Controller.userRegister(request.payload))
                }
                catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: 'user register API',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required()
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

    //user login
    {
        method: 'POST',
        path: '/api/login',
        config: {
            handler: async function (request, h) {
                try {
                    return UniversalFunctions.sendSuccess(null, await Controller.userLogin(request.payload))
                }
                catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: 'user login API',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
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
    }
]