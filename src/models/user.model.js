const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Board, {
        foreignKey: "author",
        sourceKey: "id",
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, timestamps: true, modelName: "User" }
  );

  User.beforeCreate(async (user, opt) => {
    const hasedPassword = await bcrypt.hash(user.password, 10);
    user.password = hasedPassword;
  });
  return User;
};
