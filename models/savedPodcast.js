module.exports = function(sequelize, DataTypes) {
    var SavedPodcast = sequelize.define("saved_podcast", {
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
    return SavedPodcast;
};