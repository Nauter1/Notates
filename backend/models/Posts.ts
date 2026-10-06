import { Sequelize, DataTypes } from "sequelize";

export default function Posts(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Posts = sequelize.define(
        "Posts", {
            id: {
                type: dataTypes.UUIDV4
            },
            // LIST FOR POSTS
        }
    )
}

