import { Sequelize, DataTypes } from "sequelize";

export default function Post(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Post = sequelize.define(
        "Post", {
            id: {
                type: dataTypes.UUIDV4
            },
            title: {
                type: dataTypes.STRING
            },
            content: {
                type: dataTypes.STRING
            },
            cdescription: {
                type: dataTypes.STRING
            },
            // LIST FOR REACTIONS
        }
    )
}

