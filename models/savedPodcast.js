module.exports = function(sequelize, DataTypes) {
    var savedPodcast = sequelize.define("savedPodcast", {
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
                isUrl: true;
            }
        }
    });
    savedPodcast.associate = function(db) {
        savedPodcast.belongsTo(db.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return savedPodcast;
};