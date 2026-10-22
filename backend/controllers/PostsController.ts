import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const PostsController = {
    async create (req: express.Request, res: express.Response) {
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
    },
    async getAll(req: express.Request ,res: express.Response){
        const posts = await db.posts.findAll();
        console.log("getAll: "+posts)
        return res.status(200).send(
            posts.map( 
                ({id, title}) => {return {id, title}}
            )
        )
    },
    async getByID(req: express.Request, res: express.Response){
        const postID: String = req.params.id as string
        console.log(postID)
        const post = await db.posts.findByPk(postID)
        if (!post){
            res.status(404).send({
                error:`Post with this ID is not found ${postID}`
            })
            return null;
        }
        return post;
    },
    async modifyById(req: express.Request, res: express.Response){
        const postToBeModified = await this.getByID(req, res)
        if (!postToBeModified){
            return;
        }
        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.description
        ){
            return res.status(400).send({
                error: `Missing Parameters.`
            }
        )
        }
        postToBeModified.title = req.body.title
        postToBeModified.content = req.body.content
        postToBeModified.description = req.body.description

        await postToBeModified.save()

        return res.location(`${Utilities.getBaseURL(req)}/posts/${postToBeModified.id}`)
        .status(201).send(postToBeModified)
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
export default PostsController