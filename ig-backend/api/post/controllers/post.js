'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);

            if (!data || !data.description) {
                ctx.throw(400, 'Please write a description') //Check if the description is within the data Object
            }
            if (!files || !files.image) { //Check for the files whitin the request
                ctx.throw(400, 'There are no files in the request')
            }

            const { user } = ctx.state; //The context is basically everything that comes with the request. And the user is in there.

            //Here i'm creating a new post with all the data that comes from the request as well as the user that comes within the ctx.state
            entity = await strapi.services.post.create({ ...data, ...{ likes: 0, author: user } }, { files });

        } else {
            //Validation to check if the request is Multipart. Only the creation of the post has multipart body
            ctx.throw(400, 'The Request must be Multi-Part')
        }
        return sanitizeEntity(entity, { model: strapi.models.post });
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;

        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            ctx.throw(400, "Please only make JSON request with an updated description")
        } else {
            entity = await strapi.services.post.update({ id, author: user.id }, ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.post });
    },

    async delete(ctx) {
        const { id } = ctx.params;
        const {user} = ctx.state;

        const entity = await strapi.services.post.delete({ id, author:user.id });
        return sanitizeEntity(entity, { model: strapi.models.post });
    },
};

