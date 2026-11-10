import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";

export class UserBadges extends Model<InferAttributes<UserBadges>,
InferCreationAttributes<UserBadges>> {
    //musthave
    declare BadgeId: string
    declare UserId: string
    declare DateObtained: CreationOptional<Date>

    //canhave
    declare id: CreationOptional<string>

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
            BadgeId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            UserId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            DateObtained: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserBadges",
            indexes: [
                {
                    unique: true,
                    fields: ["UserId", "BadgeId"]
                }
            ]
        }
    )
    
    return UserBadges
}   