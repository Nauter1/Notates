import type { UUID } from "node:crypto";
import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";

const EMOJI_REGEX = /^(?:\p{Extended_Pictographic}|\p{Regional_Indicator}|[\u200d\ufe0f\u20e3]|[\u{1F3FB}-\u{1F3FF}])+$/u;

function isEmoji(value: string): boolean {
    return EMOJI_REGEX.test(value.trim());
}

// Assumes the PNG is stored as a data URI or a URL ending in .png
function isPng(value: string): boolean {
    const v = value.trim();
    return /^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(v) || /^https?:\/\/\S+\.png(\?\S*)?$/i.test(v);
}

export class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> {
    //musthave
    declare ReactionID: UUID;
    declare PostID: string;
    declare UserID: string;
    declare IsComment: boolean;
    declare Content: string;
    //Info about Content
    //  - When IsComment = true : text (In this case it is a comment)
    //  - When IsComment = false, IsCustomReaction = false : an emoji (In this case it is a reaction on the post, similar to discord reactions)
    //  - When IsComment = false, IsCustomReaction = true  : ReactionSourceID is used to get a png (In this case it is a custom reaction on the post, artists can create custom reactions that can be added to their posts)

    //canhave
    declare IsCustomReaction: CreationOptional<boolean>;
    declare ReactionSourceID: CreationOptional<string | null>; // FK to the custom reactions table, only when IsCustomReaction = true

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default function initReactionModel(sequelize: Sequelize) {
    Reaction.init(
        {
            ReactionID: {
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
            IsCustomReaction: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            Content: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "All params are not filled" },
                },
            },
            ReactionSourceID: {
                type: DataTypes.UUID, 
                allowNull: true,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Reaction",
            validate: {
                contentMatchesType(this: Reaction) {
                    const content = this.Content;

                    if (this.IsCustomReaction && !this.ReactionSourceID) {
                        throw new Error("A custom reaction must have a ReactionSourceID");
                    }
                    if (!this.IsCustomReaction && this.ReactionSourceID) {
                        throw new Error("Only a custom reaction can have a ReactionSourceID");
                    }

                    if (this.IsComment) {
                        if (this.IsCustomReaction) {
                            throw new Error("A comment cannot be a custom reaction");
                        }
                        if (typeof content !== "string" || content.trim() === "") {
                            throw new Error("A comment must have text content");
                        }
                        return;
                    }

                    if (this.IsCustomReaction) {
                        if (!isPng(content)) {
                            throw new Error("A custom reaction's content must be a PNG");
                        }
                    } else if (!isEmoji(content)) {
                        throw new Error("A reaction's content must be an emoji");
                    }
                },
            },
        }
    );

    return Reaction;
}