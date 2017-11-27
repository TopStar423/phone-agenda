module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("comments", {
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        podcastInfo: {
          type: DataTypes.TEXT,
          allowNull: true
        }
    });

    Comments.associate = function(models) {
        Comments.belongsTo(models.users, {
            foreignKey: {
                allowNull: true
            }
        });
    };
    return Comments;
};