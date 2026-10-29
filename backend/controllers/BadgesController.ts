import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import { Badges } from "../models/Badges.ts"
import { User } from "../models/User.ts"

const BadgesController = {
     async create(req: express.Request, res: express.Response) {
    if (!req.body.Title || !req.body.Description) {
        return res.status(400).send({
            error: "Missing parameters, please review data"
        });
    }

    const result = await db.badges.create({
        id: uuidv7(),
        Title: req.body.Title,
        Description: req.body.Description,
        DateObtained: req.body.DateObtained,
        JoinDate: req.body.JoinDate,
        isAdmin: false,
        postCount: req.body.postCount ?? 0,
        isPlusMember: false,
        reactionCount: req.body.reactionCount ?? 0,
        isVerifiedArtist: false
    });

    return res.status(201).json(result);
},

    async getBadge(req: express.Request, res: express.Response) {
    const badgeID = req.params.id;

    if (typeof badgeID !== "string" || !badgeID) {
        return res.status(400).json({
            error: "Invalid or missing badge id"
        });
    }

    try {
        const badge = await db.badges.findByPk(badgeID);

        if (!badge) {
            return res.status(404).json({
                error: `Badge not found with id: ${badgeID}`
            });
        }

        return res.status(200).json(badge);
    } catch (err) {
        console.error("Error retrieving badge:", err);

        return res.status(500).json({
            error: "Failed to retrieve badge"
        });
    }
},
     async modifyById(req: express.Request, res: express.Response) {
    const badgeID = req.params.id;

    if (typeof badgeID !== "string" || !badgeID) {
        return res.status(400).json({
            error: "Invalid or missing badge id"
        });
    }

    if (!req.body.Title || !req.body.Description) {
        return res.status(400).json({
            error: "Missing parameters, please review data"
        });
    }

    try {
        const badge = await db.badges.findByPk(badgeID);

        if (!badge) {
            return res.status(404).json({
                error: `Badge not found with id: ${badgeID}`
            });
        }

        await badge.update({
            Title: req.body.Title,
            Description: req.body.Description,
            DateObtained: req.body.DateObtained,
            JoinDate: req.body.JoinDate,
            postCount: req.body.postCount,
            reactionCount: req.body.reactionCount
        });

        return res.status(200).json(badge);
    } catch (err) {
        console.error("Error updating badge:", err);

        return res.status(500).json({
            error: "Failed to update badge"
        });
    }
},
     async deleteById(req: express.Request, res: express.Response) {
    const badgeID = req.params.id as string;

    if (!badgeID) {
        return res.status(400).send({
            error: "No badge id supplied"
        });
    }

    const badgeToBeDeleted = await db.badges.findByPk(badgeID);

    if (!badgeToBeDeleted) {
        return res.status(404).send({
            error: `Badge with this id does not exist: ${badgeID}`
        });
    }

    await badgeToBeDeleted.destroy();

    return res.status(204).send();
},
async getAll(req: express.Request, res: express.Response) {
    try {
        const badges = await db.badges.findAll();
        return res.status(200).json(badges);
    } catch (err) {
        console.error("Error retrieving badges:", err);
        return res.status(500).json({
            error: "Failed to retrieve badges"
        });
    }
},

         
}
export default BadgesController