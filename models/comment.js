module.exports = function (sequelize, DataTypes) {
  var Comments = sequelize.define("comments", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    podcastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    podcastEpisodeName: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Comments.associate = function (models) {
    Comments.belongsTo(models.users, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Comments;
};