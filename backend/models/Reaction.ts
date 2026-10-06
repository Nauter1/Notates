import { Sequelize, DataTypes } from "sequelize";

export default function Reaction(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Reaction = sequelize.define(
        "Reaction", {
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

