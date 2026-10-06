import { Sequelize, DataTypes } from "sequelize";

export default function Userpost(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Userpost = sequelize.define(
        "Userpost", {
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

