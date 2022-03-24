const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.belongsTo(models.User, {
        foreignKey: {
          name: "author",
          allowNull: false,
        },
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  // test

  Board.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    { sequelize, timestamps: true, modelName: "Board" }
  );

  return Board;
};
