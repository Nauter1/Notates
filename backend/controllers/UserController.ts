import * as express from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const PostsController = {
    async create (req: express.Request ,res: express.Response) {
        if (!req.body.username ||
            !req.body.Email ||
            !req.body.password ||
            !req.body.passwordconfirm 
        ){
            return res.status(400).send({error:`Missing Param`})
        }
        const newUser = {
            id: uuidv7(),
            username: req.body.username,
            avatarname: req.body.username,
            Email: req.body.Email,
            PasswordHASH: "",
            Signup: Date.now(),
            AccountType: "Unverified"

        }
        newUser.PasswordHASH = await Utilities.gimmePassword(req.body.password)

        const result = await db.users.create(newUser);

        return res.location(`${Utilities.getBaseURL(req)}/users/${result.id}`).sendStatus(201);
    },
    async getAll(req: express.Request, res: express.Response){
        const users = await db.users.findAll();
        console.log("getAll: "+users)
        return res.status(200).send(
            users.map( 
                ({id, username}) => {return {id, username}}
            )
        )
    },
    async getByID(req: express.Request ,res: express.Response){
        const userID: String = req.params.id as string
        console.log(userID)
        const user = await db.posts.findByPk(userID)
        if (!user){
            res.status(404).send({
                error:`User with this ID is not found ${userID}`
            })
            return null;
        }
        return user;
    },
    async modifyById(req: express.Request, res: express.Response){
        const userToBeModified = await this.getByID(req, res)
        if (!userToBeModified){
            return;
        }
        if (
            !req.body.username ||
            !req.body.avatarname ||
            !req.body.Email ||
            !req.body.password ||
            !req.body.Date ||
            !req.body.AccountType
        ){
            return res.status(400).send({
                error: `Missing Parameters.`
            }
        )
        }
        userToBeModified.username = req.body.username,
        userToBeModified.avatarname = req.body.avatarname,
        userToBeModified.Email = req.body.Email,
        userToBeModified.PasswordHASH = await Utilities.gimmePassword(req.body.password),
        userToBeModified.Signup = req.body.Date,
        userToBeModified.AccountType = req.body.AccountType

        await userToBeModified.save()

        return res.location(`${Utilities.getBaseURL(req)}/posts/${userToBeModified.id}`)
        .status(201).send(userToBeModified)
    },
    async deleteById(req: express.Request, res: express.Response){
        const userToBeDeleted = await this.getByID(req, res)
        if (!userToBeDeleted){
            return;
        }
        await userToBeDeleted.destroy();
        return res.status(204).send({error: "No content."})
    }
}