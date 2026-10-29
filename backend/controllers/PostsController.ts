import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error } from "node:console";
import { Post } from "../models/Post.ts";

const PostsController = {
    async create(req: express.Request, res: express.Response)  {
        const requiredFields = ["PostTitle","PostDescription","ReleaseDate","ContentLink"]
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0){
            return res.status(400).send({
                error: "Missing Params, please check these over.",
                missing: missingFields
            })
        }   
        const newPost = {
            id: uuidv7(),
            PostTitle: req.body.PostTitle,
            PostDescription: req.body.PostDescription,
            ReleaseDate: req.body.ReleaseDate,
            ContentLink: req.body.ContentLink,
        }
        const createdPost = await db.posts.create(newPost);

        return res
        .location(`${Utilities.getBaseURL(req)}/posts/${createdPost.id}`).sendStatus(201);
    },
    async getAll(req: express.Request, res: express.Response) {
        const posts = await db.posts.findAll();
        console.log("getAll: "+posts)
        return res
        .status(200)
        .send(
            posts.map
            (
                ({id, PostTitle}) => {return {id, PostTitle}}
            )
        )
    },
    async getByID(req: express.Request, res: express.Response) {
        
        const post = await PostsController.getPost(req, res)
        if (!post) {
            console.log("no post")
            return
        }
        console.log("Post is found")
        return res.status(200).send(post);
    },
    async modifyById(req: express.Request, res: express.Response) {
        if (!req.params.id) 
            {
                console.log(req.params.id)
                return res.status(400).send({"error":"No id supplied"})
            }     
            console.log(req.params.id)
        const postToBeModified = await PostsController.getPost(req, res)
        console.log(postToBeModified)
        if (!postToBeModified) {
            console.log("Post not found")
            return res.status(404).send({"error":"Post not found with id "+postToBeModified});
        }
        if (
            !req.body.PostTitle
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameter: PostTitle"
                }
            )
        }
        if (
            !req.body.PostDescription
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameter: PostDescription"
                }
            )
        }
        if (
            !req.body.ReleaseDate
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameter: ReleaseDate"
                }
            )
        }
        if (
            !req.body.ContentLink
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameter: ContentLink"
                }
            )
        }
        const idString = req.params.id.toString();
        const modifiedPost = {

            id: idString,
            PostTitle: req.body.PostTitle,
            PostDescription: req.body.PostDescription,
            ReleaseDate: req.body.ReleaseDate,
            ContentLink: req.body.ContentLink,
            updatedAt: new Date(),
        }

        console.log("---")
        console.log(modifiedPost)
        console.log("---")

        await db.posts.update(modifiedPost, { where: {id: req.params.id}})

        return res.location(`${Utilities.getBaseURL(req)}/posts/${postToBeModified}`)
        .status(201)
        .send(modifiedPost)
    },
    async deleteById(req: express.Request, res: express.Response) {
        const postToBeDeleted = await PostsController.getPost(req, res)
        if (!postToBeDeleted) {
            return;
        }
        await postToBeDeleted.destroy();
        return res.status(204)
        .send({error: "No content."})

    },
    async getPost(req: express.Request, res: express.Response) {
        let postID: string = req.params.id as string
        console.log(postID)
        const post = await db.posts.findByPk(postID);
        if (!post) {
            console.log("Post not found")
            res.status(404).send({
                error: `Post with this ID is not found. ${postID}`
            })
            return null;
        }
        return post
    }
}

export default PostsController

/*import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const PostsController = {
    async create(req: express.Request, res: express.Response)  {
        if (
            !req.body.PostTitle || 
            !req.body.PostDescription ||
            !req.body.ReleaseDate ||
            !req.body.ContentLink
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        const newPost = {
            id: uuidv7(),
            PostTitle: req.body.PostTitle,
            PostDescription: req.body.PostDescription,
            ReleaseDate: req.body.ReleaseDate,
            ContentLink: req.body.ContentLink,
        }
        const createdGame = await db.posts.create(newPost);

        return res
        .location(`${Utilities.getBaseURL(req)}/games/${createdGame.id}`).sendStatus(201);
    },
    async getAll(req: express.Request, res: express.Response) {
        const posts = await db.posts.findAll();
        console.log("getAll: "+posts)
        return res
        .status(200)
        .send(
            posts.map
            (
                ({id, PostTitle}) => {return {id, PostTitle}}
            )
        )
    },
    async getByID(req: express.Request, res: express.Response) {
        let postID: string = req.params.id as string
        console.log(postID)
        const post = await db.posts.findByPk(postID);
        if (!post) {
            res.status(404).send({
                error: `Game with this ID is not found. ${postID}`
            })
            return null;
        }
        return post;
    },
    async modifyById(req: express.Request, res: express.Response) {
        const postToBeModified = await this.getByID(req, res)
        if (!postToBeModified) {
            return;
        }
        if (
            !req.body.PostTitle || 
            !req.body.PostDescription ||
            !req.body.ReleaseDate ||
            !req.body.ContentLink
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        postToBeModified.PostTitle = req.body.PostTitle,
        postToBeModified.PostDescription = req.body.PostDescription,
        postToBeModified.ReleaseDate = req.body.ReleaseDate,
        postToBeModified.ContentLink = req.body.ContentLink,

        await postToBeModified.save()

        return res.location(`${Utilities.getBaseURL(req)}/posts/${postToBeModified.id}`)
        .status(201)
        .send(postToBeModified)
    },
    async deleteById(req: express.Request, res: express.Response){
        const postToBeDeleted = await this.getByID(req, res)
        if (!postToBeDeleted){
            return;
        }
        await postToBeDeleted.destroy();
        return res.status(204).send({error: "No content."})
    }
}
export default PostsController*/