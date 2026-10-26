import {Sequelize, DataTypes} from 'sequelize';

// modelite pathid
import PostModel from "../backend/models/Post.ts"
import UserModel from "../backend/models/User.ts"
import UserPostsModel from './models/UserPosts.ts';
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
    reactions: require("../backend/models/Reaction.ts")(sequelize, DataTypes),
    posts: require("../backend/models/Post.ts")(sequelize, DataTypes),
    users: require("../backend/models/User.ts")(sequelize, DataTypes),
    userPosts: require("../backend/models/UserPosts.ts")(sequelize, DataTypes)
};
db.userPosts = require("../backend/models/UserPosts.ts")(sequelize, DataTypes, db.posts, db.users)
db.posts.belongsToMany(db.users, {through: db.userPosts, as: "UserId"})
db.users.belongsTo(db.posts, {through: db.userPosts, as: "PostId"})

const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

// export
export {db, sync, connect}