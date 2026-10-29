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
            !req.body.Description ||
            !req.body.DateObtained
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
     },



     async getUser(req: express.Request, res: express.Response) {
        let userID: string = req.params.id as string
        //console.log(userID)
        const user = await db.users.findByPk(userID);
        if(!user) {
            res.status(404).send(
                {
                    error: `user with this id does not exist: ${userID}`
                }
            )
            return null;
        }
        return user;
    }
}