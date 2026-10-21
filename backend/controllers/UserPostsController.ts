import { Request, Response } from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const UserPostsController = {
    async create(req: Request, res: Response){
        const userWhoUploaded = "userid"
        const PostIdToBeAdded = "userid"
        // check if req body has user id, if not use status 403
        // else add into object to be created
        if (!req.body.Id){
            return res.status(400).send(
                {error: "Missing Parameters."}
            )
        }
        const newUserPosts = {
            id: uuidv7(),
            PostId: PostIdToBeAdded, // later get real post id
            UserId: userWhoUploaded // later get real user id 
        }
        const addedUserPosts = await db.userPosts.create(newUserPosts)

        return res.location(`${Utilities.getBaseURL(req)}/userPosts/${addedUserPosts.id}`).sendStatus(201)
    }
}

export default UserPostsController