import type { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { Reaction } from "../models/Reaction.ts";

const ReactionsController = {
    async createComment(req: Request, res: Response) {
        const { Content, PostID, UserID } = req.body;

        if (!Content || !PostID || !UserID) {
            return res.status(400).send({
                error: "Missing parameters, please review data",
            });
        }

        try {
            const createdReaction = await Reaction.create({
                ReactionID: uuidv7(),
                PostID,
                UserID,
                Content,
                IsComment: true,
            });

            return res
                .location(`${Utilities.getBaseURL(req)}/reactions/${createdReaction.ReactionID}`)
                .sendStatus(201);
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).send({ error: err.message });
            }
            console.error(err);
            return res.status(500).send({ error: "Internal server error" });
        }
    },
};

export default ReactionsController;