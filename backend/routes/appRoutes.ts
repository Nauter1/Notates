import type express from "express"
//import ReactionsController from "../controllers/ReactionsController.ts";
import PostsController from "../controllers/PostsController.ts";
import { Badges } from "../models/Badges.ts";
import BadgesController from "../controllers/BadgesController.ts";
//import UserController from "../controllers/UserController.ts";
//import userPostsController from "../controllers/UserPostsController.ts";

export default (app: express.Express): void => {
    //reaktsioonid
 /*   app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/reactions/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)

    //badgeid - TODO
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/reactions/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)
*/
    //postitused - TODO

    app.route("/posts")
        .post(PostsController.create)         // C reate
        .get(PostsController.getAll)          // R ead
        
    app.route("/posts/:id")
        .delete(PostsController.deleteById)   // D elete
        .get(PostsController.getByID)         
        .put(PostsController.modifyById)      // U pdate

    app.route("/badges")
        .post(BadgesController.create)
        .get(BadgesController.getBadge)

    app.route("/badges/:id")
        .delete(BadgesController.deleteById)
        .get(BadgesController.getBadge)
        .put(BadgesController.modifyById)


    // userPosts

    //app.route("/userposts").get(userPostsController.getAll).post(userPostsController.create)
}