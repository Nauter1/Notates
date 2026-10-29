import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";
import type { Json } from "sequelize/lib/utils";


export class Badges extends Model<InferAttributes<Badges>,InferCreationAttributes<Badges>> {
    //musthave
    declare Title: string;
    declare Description: string;
    declare DateObtained: Date;
    declare JoinDate: Date;
    declare isAdmin: boolean;
    declare postCount: Number;
    declare isPlusMember: boolean;
    declare reactionCount: Number;
    declare isVerifiedArtist: boolean;

    //important
    declare id: CreationOptional<string>

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
                type: DataTypes.DATE,
            },
            JoinDate: {
                type: DataTypes.DATE,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
            },
            postCount: {
                type: DataTypes.INTEGER,
                //reference some other value? or keep this
            },
            isPlusMember: {
                type: DataTypes.NUMBER,
            },
            reactionCount: {
                type: DataTypes.NUMBER,
            },
            isVerifiedArtist: {
                type: DataTypes.BOOLEAN,
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

// const badges = [

//     { id: 1, name: "JoinDate", value: Date}, ye
//     { id: 2, name: "isAdmin", value: Boolean}, ye
//     { id: 3, name: "postCount", value: Number}, ye
//     { id: 4, name: "isPlusMember", value: Boolean}, ye
//     { id: 5, name: "reactionCount", value: Number}, ye
//     { id: 6, name: "isVerifiedArtist", value: Boolean} ye

// ]
