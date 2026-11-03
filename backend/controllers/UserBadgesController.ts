import type { Request, Response } from "express";
import {
    UniqueConstraintError,
    ForeignKeyConstraintError
} from "sequelize";
import { validate as isUuid } from "uuid";
import { db } from "../db.ts";

const UserBadgesController = {
    async create(req: Request, res: Response) {
        //read the user from the URL and badge from the body
        const userId = req.params.userId;
        const badgeId = req.body?.BadgeId;

        //check types before checking UUID format
        if (
            typeof userId !== "string" ||
            typeof badgeId !== "string" ||
            !isUuid(userId) ||
            !isUuid(badgeId)
        ) {
            return res.status(400).json({
                error: "UserId and BadgeId must be valid UUIDs"
            });
        }
    }
}