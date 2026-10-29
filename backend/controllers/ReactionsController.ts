import * as express from "express";
import { ValidationError } from "sequelize";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { Reaction } from "../models/Reaction.ts";



const ReactionsController = {
    async createComment(req: express.Request, res: express.Response) {
        const { Content, PostID, UserID } = req.body;

        if (!Content /*|| !PostID || !UserID*/) {
            return res.status(400).send({
                error: "Comment content missing",
            });
        }

        try {
            const createdReaction = await Reaction.create({
                ReactionID: uuidv7(),
                PostID: "00000000-0000-7000-8000-000000000001",//DEFAULT TO BE REMOVED
                UserID: "00000000-0000-7000-8000-000000000002",//DEFAULT TO BE REMOVED
                Content,
                IsComment: true,
            });

            return res
                .location(`${Utilities.getBaseURL(req)}/reactions/comment/${createdReaction.ReactionID}`)
                .sendStatus(201);
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).send({ error: err.message });
            }
            console.error(err);
            return res.status(500).send({ error: "Internal server error" });
        }
    },

        async createReaction(req: express.Request, res: express.Response) { //yes, this is different from createComment
        const { Content, PostID, UserID } = req.body;

        if (!Content /*|| !PostID || !UserID*/) {
            return res.status(400).send({
                error: "Reaction content missing",
            });
        }

        try {
            const createdReaction = await Reaction.create({
                ReactionID: uuidv7(),
                PostID: "00000000-0000-7000-8000-000000000003",//DEFAULT TO BE REMOVED
                UserID: "00000000-0000-7000-8000-000000000004",//DEFAULT TO BE REMOVED
                Content,
                IsComment: false,
            });

            return res
                .location(`${Utilities.getBaseURL(req)}/reactions/reaction/${createdReaction.ReactionID}`)
                .sendStatus(201);
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).send({ error: err.message });
            }
            console.error(err);
            return res.status(500).send({ error: "Internal server error" });
        }
    },

async getAll(req: express.Request, res: express.Response) {
    try {
        const reactions = await Reaction.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).send(
            reactions.map(
                ({
                    ReactionID,
                    PostID,
                    UserID,
                    IsComment,
                    IsCustomReaction,
                    ReactionSourceID,
                    Content,
                    createdAt,
                }) => ({
                    ReactionID,
                    PostID,
                    UserID,
                    IsComment,
                    IsCustomReaction,
                    ReactionSourceID,
                    Content,
                    createdAt,
                })
            )
        );
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }
},
};

export default ReactionsController;