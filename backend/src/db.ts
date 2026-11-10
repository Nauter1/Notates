import { Sequelize } from 'sequelize';

// modelite pathid
import PostModel from "./models/Post.ts";
import UserModel from "./models/User.ts";
import UserPostsModel from "./models/UserPosts.ts";
import ReactionModel from "./models/Reaction.ts";   // path fixed
import BadgesModel from "./models/Badges.ts";       // path fixed
import UserBadgesModel from "./models/UserBadges.ts"

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
    } catch (error) {
        console.log("db connection error", error);
    }
};

// mudelite initsialiseerimine
const _Post = PostModel(sequelize);
const _User = UserModel(sequelize);
const _UserPosts = UserPostsModel(sequelize);
const _Badges = BadgesModel(sequelize);
const _Reaction = ReactionModel(sequelize);         // THIS WAS MISSING
const _UserBadges = UserBadgesModel(sequelize);

//andmebaasi instants ja seostused
_User.hasMany(_UserPosts, { foreignKey: "UserId" });
_UserPosts.belongsTo(_User, { foreignKey: "UserId" });

_User.hasMany(_UserBadges, { foreignKey: "UserId" });
_UserBadges.belongsTo(_User, { foreignKey: "UserId" });

_Badges.hasMany(_UserBadges, { foreignKey: "BadgeId" });
_UserBadges.belongsTo(_Badges, { foreignKey: "BadgeId" });

const db = {
    Sequelize,
    sequelize,
    posts: _Post,
    users: _User,
    userPosts: _UserPosts,
    badges: _Badges,
    reactions: _Reaction,                           // added
    userBadges: _UserBadges,
};

//sünkroonmeetod
const sync = async (): Promise<void> => {
    await sequelize.sync({ alter: true });
    console.log("DB is synced");
};

//export
export { db, sync, connect };
