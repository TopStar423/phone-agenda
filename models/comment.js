module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("comments", {
        commentID: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        podcastInfo: {
          type: DataTypes.TEXT,
          allowNull: false
        }
    });

    Comments.associate = function(models) {
        Comments.belongsTo(models.users, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comments;
};