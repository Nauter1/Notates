import type { UUID } from "node:crypto";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";
import type { Json } from "sequelize/lib/utils";

export class Post extends Model<InferAttributes<Post>,InferCreationAttributes<Post>> {
    //musthave
    declare PostTitle: string;
    declare PostDescription: string;
    declare ReleaseDate: Date;
    declare ContentLink: string;

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

export default function initGameModel(sequelize: Sequelize) 
{
    Post.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true
            },
            PostTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ContentLink: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PostDescription: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ReleaseDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Post"
        }
    )
    return Post;
}

/*import { Sequelize, DataTypes } from "sequelize";

export default function Post(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Post = sequelize.define(
        "Post", {

            // LIST FOR REACTIONS
        }
    )
}
*/
