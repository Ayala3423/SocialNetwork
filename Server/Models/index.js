const sequelize = require("../Config/db.js");
const {Users, Todos, Posts, Albums, Photos, Comments, Passwords} = sequelize.models;

Users.hasMany(Todos, { foreignKey: 'userId' });
Todos.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Posts, { foreignKey: 'userId' });
Posts.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Albums, { foreignKey: 'userId' });
Albums.belongsTo(Users, { foreignKey: 'userId' });

Posts.hasMany(Comments, { foreignKey: "postId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });

Albums.hasMany(Photos, { foreignKey: "albumId" });
Photos.belongsTo(Albums, { foreignKey: "albumId" });

Users.hasOne(Passwords, { foreignKey: "userId" });
Passwords.belongsTo(Users, { foreignKey: "userId" }); 