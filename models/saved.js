module.exports = function(sequelize, DataTypes) {
    var Saved = sequelize.define("savedPodcasts", {
        podcastID: {
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

    Saved.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

    return Saved;
};