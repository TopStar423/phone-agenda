module.exports = function (sequelize, DataTypes) {
  var Saved = sequelize.define("savedPodcasts", {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    podcastName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  });

  Saved.associate = function (models) {

    Saved.belongsTo(models.users, {
      foreignKey: {
        allowNull: false,
        primaryKey: true
      }
    });
  };

  return Saved;
};