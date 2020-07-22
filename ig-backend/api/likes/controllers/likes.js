'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx) {
        let entity;

        const { user } = ctx.state; //User that made the request.
        const { post } = ctx.request.body; //ID of the Post

        if (typeof post !== 'number') {
            ctx.throw(400, 'Please only pass the ID for the Post')
        }

        const realPost = await strapi.services.post.findOne({ id: post }); // Find the POST
        if (!realPost) {//If the POST1  on the DB doesn't exist
            ctx.throw('This post does not exist')
        }

        const foundLike = await strapi.services.likes.findOne({ //Find the like in the DB
            user: user.id,
            post: post.id
        })
        if (foundLike) {//If the like has already been done
            ctx.throw(400, 'You already liked this post')
        }

        if (ctx.is('multipart')) {//If the Request is not a JSON
            ctx.throw(400, 'Only make JSON requests')
        }

        //If everything is OK create the like
        entity = await strapi.services.likes.create({ post, user });

        //Update the like counter on the POST collection
        const { likes } = realPost
        const updatedPost = await strapi.services.post.update({ id: post }, { likes: likes + 1 });


        return sanitizeEntity(entity, { model: strapi.models.likes });
    },

    async delete(ctx) {
        const { user } = ctx.state;
        const { postId } = ctx.params;
        const { post } = parseInt(postId);

        if (typeof post !== 'number') { //Check if the params passed is a number
            ctx.throw(400, 'Please only use the ID of the Post')
        }

        const entity = await strapi.services.like.delete({
            post,
            user: user.id
        });

        if(entity.length){
            const {likes} = entity[0].post;
            const updatedPost = await strapi.services.post.update(
                {id: post,},
                {likes: likes -1})
        }
        return sanitizeEntity(entity, { model: strapi.models.like });
    }
};