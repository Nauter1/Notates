import {Sequelize, DataTypes} from 'sequelize';

// modelite pathid
import ReactionModel from "../backend/models/Reaction.ts"

// sequelizei andmebaasi ühendusandmed
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOSTNAME!,
        dialect: "mariadb",
        logging: console.log,
    }
);

// ühendusmeetod

const connect = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connection established.");
    }
    catch (error){
        console.error("db connect error", error)
    }
}

const db = {
    Sequelize,
    sequelize,
    reactions: require("../backend/models/Reaction.ts")(sequelize, DataTypes)
};

const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

// export
export {db, sync, connect}