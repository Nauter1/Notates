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
                type: DataTypes.BOOLEAN,
            },
            reactionCount: {
                type: DataTypes.INTEGER,
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

// {"id":"01a18710-a6c5-73c8-b9bc-f07aeb27dcc4","Title":"Verified Artist","Description":"Awarded to verified artists on Notates","DateObtained":"2026-10-29T10:00:00.000Z","JoinDate":"2026-01-15T00:00:00.000Z","isAdmin":false,"postCount":25,"isPlusMember":false,"reactionCount":150,"isVerifiedArtist":false,"updatedAt":"2026-10-29T09:49:37.863Z","createdAt":"2026-10-29T09:49:37.863Z"}
