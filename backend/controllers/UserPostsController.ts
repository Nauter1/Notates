import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import * as UUID from "node:crypto";
import { DATE } from "sequelize";
import type { UserPosts } from "../models/UserPosts.ts";

const UserPostsController = {
    async create(req: express.Request, res: express.Response) {
        const userWhoUploaded = "9f6a98e7-d13d-11f1-8dc2-901b0eec5991"
        //check if req body has a user id
        //if not, use status 403
        //else, add into object to be created
        if (!req.body.GameId
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        const starterJson = `{"GameIDs":"${req.body.GameId}"}`
        const postIdToBeAddedToCollection = JSON.parse(starterJson)
        const newUserPosts = {
            id: uuidv7(),
            //CollectionDescription: req.body.CollectionDescription,
            UserId: userWhoUploaded, //later get real userid
            PostIDs: postIdToBeAddedToCollection, //later get real gameidarray
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const addedUserPosts = await db.userPosts.create(newUserPosts)

        return res.location(`${Utilities.getBaseURL(req)}/userposts/${addedUserPosts.id}`).sendStatus(201)
    },
    async modifyById(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            console.log(req.params.id)
            return res.status(400).send({"error":"No id supplied"})
        }
        if (!req.body) {
            return res.status(400).send({"error":"No body was supplied, nothing was changed"})
        }

        const userPostToBeModified = await UserPostsController.getUserPosts(req, res)

        if (!userPostToBeModified) {
            return res.status(404).send({"error":"UserCollection not found with id "+req.params.id});
        }

        //eeldame et vaade annab vanad andmed ka kaasa
        const modifiedUserPost = {

        } as UserPosts
        modifiedUserPost.updatedAt = new Date()

        await db.userPosts.update(modifiedUserPost, {
            where:{
                id: req.params.id
            }
        })
        return res.location(`${Utilities.getBaseURL(req)}/userposts/${userPostToBeModified}`).status(201).send(modifiedUserPost)

    },
}
export default UserPostsController

/*
    declare PostIDs: Json
    declare UserId: string

    //canhave
    declare id: CreationOptional<string | null>
    //declare CollectionDescription: CreationOptional<string | null>

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
*/