import type express from "express"
import ReactionsController from "../controllers/ReactionsController.ts";
import PostsController from "../controllers/PostsController.ts";
import { Badges } from "../models/Badges.ts";
import BadgesController from "../controllers/BadgesController.ts";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";
//import UserController from "../controllers/UserController.ts";
//import userPostsController from "../controllers/UserPostsController.ts";


export default (app: express.Express): void => {
    //reaktsioonid
    app.route("/reactions")
        .get(ReactionsController.getAll)

    app.route("/reactions/comment")
        .post(checkRequestBody, ReactionsController.createComment)

    app.route("/reactions/reaction")
        .post(checkRequestBody, ReactionsController.createReaction)

    app.route("/reactions/:id")
        .delete(ReactionsController.deleteById)
        .get(ReactionsController.getById)
        
    // TODO: add these once the handlers exist in ReactionsController
    // app.route("/reactions/:id")
    //     .get(ReactionsController.getByID)
    //     .delete(ReactionsController.deleteByID)
    //     .put(ReactionsController.modifyByID)

    //badgeid - TODO

    //postitused - TODO

    app.route("/posts")
        .post(checkRequestBody, PostsController.create)         // C reate
        .get(PostsController.getAll)          // R ead

    app.route("/posts/:id")
        .delete(PostsController.deleteById)   // D elete
        .get(PostsController.getByID)
        .put(checkRequestBody, PostsController.modifyById)      // U pdate

    app.route("/badges")
        .post(checkRequestBody, BadgesController.create)
        .get(BadgesController.getAll)

    app.route("/badges/:id")
        .delete(BadgesController.deleteById)
        .get(BadgesController.getBadge)
        .put(checkRequestBody, BadgesController.modifyById)


    // userPosts

    //app.route("/userposts").get(userPostsController.getAll).post(userPostsController.create)
}