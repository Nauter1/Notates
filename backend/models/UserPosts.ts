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

