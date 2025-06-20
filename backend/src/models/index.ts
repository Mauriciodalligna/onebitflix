// src/models/index.ts

import { Like } from "./Like";
import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { User } from "./User";
import { WatchTime } from "./WatchTime";
Category.hasMany(Course);

Course.belongsTo(Category);
Course.hasMany(Episode, { as: "episodes" });
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Like });
Course.hasMany(Favorite, { as: "favoritesUsers", foreignKey: "course_id" });

Episode.belongsTo(Course);
Episode.belongsToMany(User, { through: WatchTime });

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

Like.belongsTo(Course);
Like.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.belongsToMany(Episode, { through: WatchTime });
User.hasMany(Favorite, { as: "favoritesCourses", foreignKey: "user_id" });




export { Category, Course, Episode, Favorite, Like, User, WatchTime };
