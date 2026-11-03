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

        try {
            const user = await db.users.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    error: "User not found"
                });
            }

            const badge = await db.badges.findByPk(badgeId);

            if (!badge) {
                return res.status(404).json({
                    error: "Badge not found"
                });
            }
            // the model supplies the id and award date
            const assignment = await db.userBadges.create({
                UserId: userId,
                BadgeId: badgeId
            });

            return res.status(201).json(assignment);
        } catch (err) {
            // the combined unique index rejects duplicate awards
            if (err instanceof UniqueConstraintError) {
                return res.status(409).json({
                    error: "User already has this badge"
                });
            }
        }
    }
}