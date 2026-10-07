import { Sequelize, DataTypes } from "sequelize";

export default function Badges(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Badges = sequelize.define(
        "Badges", {
            id: {
                type: dataTypes.UUIDV4
            },
        }
    )
}

