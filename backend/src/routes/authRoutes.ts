import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";
import AuthenticationsController from "../controllers/AuthenticationsController.ts"

const router = express.Router();

router.get("/",(req,res,next)=>{
    next();
}, AuthenticationsController.newToken);

router.put("/:id", {req,res,next} => {
    next();
}, checkRequestBody, AuthenticationsController.refreshToken);

router.delete("/:id", (req, res, next) => {
    next();
}, AuthenticationsController.invalidateToken);