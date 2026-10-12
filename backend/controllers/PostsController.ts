import { Request, Response } from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const GamesController = {
    async create (req: Request, res: Response) {
        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.description
        ){
            return res.status(400).send({
                error: `Missing Parameters, please review data.`
            })
        }
        const newPost = {
            id: uuidv7(),
            title: req.body.title,
            content: req.body.content,
            description: req.body.description
        }
        const createdPost = await db.posts.create(newPost)
    
        return res.location(`${Utilities.getBaseURL(req)}/posts/${createdPost.id}`).sendStatus(201);
    }
}
export default GamesController