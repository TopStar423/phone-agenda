var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [6, 10]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }

        }
    });

    Users.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    Users.beforeCreate(function(user, options) {
        return cryptPassword(user.password)
            .then(success => {
                user.password = success;
            })
            .catch(err => {
                if (err) console.log(err);
            });
    });

    function cryptPassword(password) {
        console.log("cryptPassword" + password);
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, function(err, salt) {
                // Encrypt password using bycrpt module
                if (err) return reject(err);

                bcrypt.hash(password, salt, null, function(err, hash) {
                    if (err) return reject(err);
                    return resolve(hash);
                });
            });
        });
    }


    Users.associate = function(models) {
        Users.hasMany(models.savedPodcasts, {
            onDelete: "cascade"

        });
        Users.hasMany(models.comments, {
            onDelete: "cascade"

        });
    };
    return Users;
};