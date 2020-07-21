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
                ctx.throw(400, 'Please write a description')
            }
            if (!files || !files.image) {
                ctx.throw(400, 'There are no files in the request')
            } 
            
            entity = await strapi.services.post.create({ ...data, likes: 0 }, { files });
            
        } else {
            ctx.throw(400, 'The Request must be Multi-Part')
        }
        return sanitizeEntity(entity, { model: strapi.models.post });
    },
};

