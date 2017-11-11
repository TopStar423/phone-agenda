module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        commentID: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        userID: {
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
    Comment.associate = function(db) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Comment.belongsTo(db.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comment;
};