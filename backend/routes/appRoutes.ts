import { Express } from "express";
import ReactionsController from "../controllers/ReactionsController.ts";

export default (app: Express): void => {
    //reaktsioonid
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/reactions/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)

    //badgeid - TODO
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/reactions/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)

    //postitused - TODO
    app.route("/reactions").get(ReactionsController.getAll).post(ReactionsController.create)

    app.route("/reactions/:id").get(ReactionsController.getByID).delete(ReactionsController.deleteByID).put(ReactionsController.modifyByID)
}