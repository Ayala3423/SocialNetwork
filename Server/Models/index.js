import sequelize from '../../DB/Config/db.js';
import Users from '../Models/Users.js';
import Todos from '../Models/Todos.js';
import Posts from '../Models/Posts.js';
import Comments from '../Models/Comments.js';
import Passwords from '../Models/Passwords.js';

Users.hasMany(Todos, { foreignKey: 'userId' });
Todos.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Posts, { foreignKey: 'userId' });
Posts.belongsTo(Users, { foreignKey: 'userId' });

Posts.hasMany(Comments, { foreignKey: "postId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });

Users.hasOne(Passwords, { foreignKey: "userId" });
Passwords.belongsTo(Users, { foreignKey: "userId" });

export {
    Users,
    Todos,
    Posts,
    Comments,
    Passwords
};  