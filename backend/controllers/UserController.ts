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
    },
}