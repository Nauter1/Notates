import { Sequelize, DataTypes } from "sequelize";

export default function News(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const News = sequelize.define(
        "News", {
            id: {
                type: dataTypes.UUIDV4
            },
            title: {
                type: dataTypes.STRING
            },
            content: {
                type: dataTypes.STRING
            },
            // LIST FOR REACTIONS
        }
    )
}

