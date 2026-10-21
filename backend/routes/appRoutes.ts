import { Express } from "express";
import ReactionsController from "../controllers/ReactionsController.ts";
import PostsController from "../controllers/PostsController.ts";
import UserController from "../controllers/UserController.ts";
import userPostsController from "../controllers/UserPostsController.ts";

export default (app: Express): void => {
    //reaktsioonid
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/reactions/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)

    //badgeid - TODO
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/reactions/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)

    //postitused - TODO
    app.route("/posts").get(PostsController.getAll).post(PostsController.create)

    app.route("/posts/:id").get(PostsController.getByID).delete(PostsController.deleteByID).put(PostsController.modifyByID)

    // userPosts

    app.route("/userposts").get(userPostsController.getAll).post(userPostsController.create)
}