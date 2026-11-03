import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";
import type { Json } from "sequelize/lib/utils";

export class UserBadges extends Model<InferAttributes<UserBadges>,
InferCreationAttributes<UserBadges>> {
    //musthave
    declare BadgeIDs: Json
    declare UserId: string

    //canhave
    declare id: CreationOptional<string | null>

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default function initUserBadgesModel(
    sequelize: Sequelize
) {
    UserBadges.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            // võõrvõtmed
            BadgeIDs: {
                type: DataTypes.JSON,
                allowNull: false
            },
            UserId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserBadges",
        }
    )
    
    return UserBadges
}   