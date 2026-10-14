import { Request, Response } from "express";
import { db } from "../db.ts"
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const PostsController = {
    async create (req: Request, res: Response) {
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
    async getAll(req: Request, res: Response){
        const users = await db.users.findAll();
        console.log("getAll: "+users)
        return res.status(200).send(
            users.map( 
                ({id, username}) => {return {id, username}}
            )
        )
    },
    async getByID(req: Request, res: Response){
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
    }
}