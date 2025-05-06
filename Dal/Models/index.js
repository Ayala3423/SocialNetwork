import sequelize from '../../DB/Config/db.js';  // הוספתי .js לקובץ המיובא
import Users from '../Models/Users.js';  // הוספתי .js לקובץ המיובא
import Todos from '../Models/Todos.js';  // הוספתי .js לקובץ המיובא
import Posts from '../Models/Posts.js';  // הוספתי .js לקובץ המיובא
import Comments from '../Models/Comments.js';  // הוספתי .js לקובץ המיובא
import Passwords from '../Models/Passwords.js';  // הוספתי .js לקובץ המיובא

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