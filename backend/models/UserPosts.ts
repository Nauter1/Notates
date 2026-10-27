
import type { UUID } from "node:crypto";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";
import type { Json } from "sequelize/lib/utils";

export class UserPosts extends Model<InferAttributes<UserPosts>,
InferCreationAttributes<UserPosts>> {
    //musthave
    declare PostIDs: Json
    declare UserId: string

    //canhave
    declare id: CreationOptional<string | null>
    //declare CollectionDescription: CreationOptional<string | null>

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default function initUserCollectionModel(
    sequelize: Sequelize
) {
    UserPosts.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true
            },
            // võõrvõtmed
            PostIDs: {
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
            modelName: "UserPosts",
        }
    )
    
    return UserPosts
}
/*

import { Sequelize, DataTypes } from "sequelize";

export default function UserPostsModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const UserPostsModel = sequelize.define(
        "UserPostsModel", {
            id: {
                type: dataTypes.UUIDV4,
                primaryKey: true
            },
            
            PostId:{
                type: dataTypes.ARRAY(dataTypes.UUID),
                allowNull: false
            },
            UserId:{
                type: dataTypes.UUIDV4,
                allowNull: false
            }
            // LIST FOR UserPostsModel
        }
    )
}

*/