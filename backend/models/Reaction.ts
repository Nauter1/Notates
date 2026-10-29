import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";

export class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> {
    //musthave
    declare PostID: string;
    declare UserID: string;
    declare IsComment: boolean;
    declare ReactionID: string;

    //canhave
    declare id: CreationOptional<string>;
    declare Content: CreationOptional<string | null>; //isComment = true;

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default function initReactionModel(sequelize: Sequelize) {
    Reaction.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            PostID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            UserID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            IsComment: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            Content: {
                type: DataTypes.TEXT,
                allowNull: true,
                validate: {
                    // Comment must have content
                    contentRequiredForComment(this: Reaction, value: string | null) {
                        if (this.IsComment && (!value || value.trim() === "")) {
                            throw new Error("Content is required when IsComment is true");
                        }
                    },
                },
            },
            ReactionID: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Reaction",
        }
    );

    return Reaction;
}