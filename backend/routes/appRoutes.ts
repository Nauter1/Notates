import type express from "express"
//import ReactionsController from "../controllers/ReactionsController.ts";
import PostsController from "../controllers/PostsController.ts";
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
    app.route("/posts/:id")
        .delete(PostsController.deleteById)   // D elete
        .get(PostsController.getByID)         
        .put(PostsController.modifyById)      // U pdate

    app.route("/posts")
        .post(PostsController.create)         // C reate
        .get(PostsController.getAll)          // R ead


    // userPosts

    //app.route("/userposts").get(userPostsController.getAll).post(userPostsController.create)
}