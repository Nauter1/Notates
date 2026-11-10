import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Kohustuslikud väljad uue kasutaja loomisel:
  declare UserName: string;
  declare PasswordHash: string;
  declare EmailAddress: string;

  // Valikulised väljad uue kasutaja loomisel (kuna neil on vaikeväärtus või nad on nullitavad):
  declare id: CreationOptional<string>; // Kui andmebaas/Sequelize genereerib UUID ise
  declare SignupDate: CreationOptional<string>; 
  declare AccountType: CreationOptional<string>;
  declare AvatarName: CreationOptional<string>;
  declare UserCollectionID: CreationOptional<string | null>;
  declare ReviewListID: CreationOptional<string | null>;
  declare ProfileID: CreationOptional<string | null>;
  declare CredentialID: CreationOptional<string | null>;
  
  // Süsteemsed väljad, mis tekivad automaatselt
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
export default function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize genereerib automaatselt uue UUID v4
        primaryKey: true,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PasswordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SignupDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW, // Fikseerib loomise hetke kuupäeva
      },
      AccountType: {
        type: DataTypes.STRING,
        defaultValue: "unverified",
      },
      AvatarName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserCollectionID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ReviewListID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ProfileID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EmailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CredentialID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
}
/*import { Sequelize, DataTypes } from "sequelize";

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
            // Statuses: Unverified, Verified, Artist, Admin
            // LIST FOR POSTS BY USER
            // LIST FOR BADGES
            
        }
    )
}
*/
