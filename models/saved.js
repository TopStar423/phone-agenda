module.exports = function(sequelize, DataTypes) {
    var Saved = sequelize.define("savedPodcasts", {
        podcastID: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        podcastFeedURL: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }
    });

  Saved.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Saved.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

    return Saved;
};