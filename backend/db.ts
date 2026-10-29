import { Sequelize, DataTypes } from 'sequelize';

// modelite pathid
import PostModel from "../backend/models/Post.ts"
import UserModel from "../backend/models/User.ts"
import UserPostsModel from './models/UserPosts.ts';
import ReactionModel from "../backend/models/Reaction.ts";
import BadgesModel from "../backend/models/Badges.ts";

//sequelizei andmebaasi ühendusandmed 
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

//ühendusmeetod
const connect = async (): Promise<void> => {
        try {
        await sequelize.authenticate();
        console.log("Connection established.");
    }
    catch (error)
    {
        console.log("db connection error", error)
    }
}
const _Post = PostModel(sequelize)
const _User = UserModel(sequelize)
const _UserPosts = UserPostsModel(sequelize)
const _Badges = BadgesModel(sequelize)
//andmebaasi instants ja seostused
_User.hasMany(_UserPosts,{foreignKey: "UserId" as "UserPosts"})
_UserPosts.belongsTo(_User ,{foreignKey: "UserId" as "User"})
const db = {
    Sequelize, 
    sequelize,
    posts: _Post,
    users: _User,
    userPosts: _UserPosts,
    badges: _Badges
};
// db.games.belongsToMany(db.users, {through: db.userCollections, as: "UserId"})
// db.users.belongsTo(db.games, {through: db.userCollections, as: "GameId"})



//sünkroonmeetod
const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

//export
export {db, sync, connect}