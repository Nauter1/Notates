import { Sequelize, DataTypes } from "sequelize";

export default function WadModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const User = sequelize.define(
        "Reactions", {
            id: {
                type: dataTypes.UUIDV4
            },
            postid: {
                type: dataTypes.UUIDV4
            },
            newsid: {
                type: dataTypes.UUIDV4
            },
            content: {
                type: dataTypes.STRING
            },
            rating: {
                type: dataTypes.INT
            },
            //TBD
            
        }
    )
}

