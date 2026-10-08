import ReactionsController from "../controllers/ReactionsController.ts";
import { Express } from "express";

export default (app: Express): void => {
    //reaktsioonid
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/games/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)

    //badgeid - TODO
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/games/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)

    //postitused - TODO
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/games/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)
}