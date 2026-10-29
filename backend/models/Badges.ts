import { DataTypes, Model, UUIDV4 } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";
import type { Json } from "sequelize/lib/utils";


export class Badges extends Model<InferAttributes<Badges>,InferCreationAttributes<Badges>> {
    //musthave
    declare Title: string;
    declare Description: string;
    declare DateObtained: Date;

    //canhave
    declare id: CreationOptional<string>
     /*declare ImageURL: CreationOptional<string | null>
    declare IsOwnedBy: CreationOptional<number>
    declare Reviews: CreationOptional<Json | null>
    declare Comments: CreationOptional<Json | null>*/

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default function initBadgesModel(sequelize: Sequelize) 
{
    Badges.init(
            {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            DateObtained: {
                type: DataTypes.DATE
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Badges"
        }
    )
    return Badges;
}

