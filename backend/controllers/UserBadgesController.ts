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

            // handles an user/badge deleted between lookup and insert
            if (err instanceof ForeignKeyConstraintError) {
                return res.status(404).json({
                    error: "User or badge no longer exists"
                });
            }

            console.error("Error assigning badge: ", err);

            return res.status(500).json({
                error: "Failed to assign badge"
            });
        }
    },
    async deleteByUserAndBadge(req: Request, res: Response) {
        const userId = req.params.userId;
        const badgeId = req.params.badgeId;

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
            const deletedCount = await db.userBadges.destroy({
                where: {
                    UserId: userId,
                    BadgeId: badgeId
                }
            });

            if (deletedCount === 0) {
                return res.status(404).json({
                    error: "Badge assignment not found"
                });
            }

            return res.status(204).send();
        } catch (err) {
            console.error("Error removing badge assignment:", err);

            return res.status(500).json({
                error: "Failed to remove badge assignment"
            });
        }
    }
};

export default UserBadgesController;