import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import { Badges } from "../models/Badges.ts"
import { User } from "../models/User.ts"

const BadgesController = {
     async create(req: express.Request, res: express.Response) {
        if (
            !req.body.Title || 
            !req.body.Description
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }

        const result = await db.badges.create({
            id: uuidv7(),
            Title: req.body.Title,
            Description: req.body.Description,
            DateObtained: req.body.DateObtained,
            JoinDate: req.body.JoinDate,
            isAdmin: false,
            postCount: req.body.postCount,
            isPlusMember: false,
            reactionCount: req.body.reactionCount,
            isVerifiedArtist: false
        });
     },

     async getBadge(req: express.Request, res: express.Response) {
        let badgeID: string = req.params.id as string
        //console.log(badgeID)
        const badge = await db.badges.findByPk(badgeID);
        if(!badge) {
            res.status(404).send(
                {
                    error: `badge with this id does not exist: ${badgeID}`
                }
            )
            return null;
        }
        let userID: string = req.params.id as string
        //console.log(userID)
        const user = await db.users.findByPk(userID);
        if(!user) {
            res.status(404).send(
                {
                    //then returns 404 if user does not exist)
                    error: `user with this id does not exist: ${userID}`
                }
            )
            return null;
        }
        return badge;
     }
}
export default BadgesController