import { Sequelize, DataTypes } from "sequelize";

export default function User(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const User = sequelize.define(
        "User", {
            id: {
                type: dataTypes.UUIDV4
            },
            username: {
                type: dataTypes.STRING
            },
            avatarname: {
                type: dataTypes.STRING
            },
            PasswordHASH: {
                type: dataTypes.STRING
            },
            Signup: {
                type: dataTypes.DATE
            },
            Email: {
                type: dataTypes.STRING
            },
            AccountType: {
                type: dataTypes.STRING
            },
            // LIST FOR POSTS BY USER
            // LIST FOR BADGES
            
        }
    )
}

