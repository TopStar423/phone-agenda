'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        username: 'akelley',
        password: 'testing123',
        email: 'akelley@demo.com',
        createdAt: '2017-12-02 21:48:39',
        updatedAt: '2017-12-02 21:48:39'
      },
      {
        username: 'cgalya',
        password: 'testing123',
        email: 'cgalya@demo.com',
        createdAt: '2017-12-02 21:48:39',
        updatedAt: '2017-12-02 21:48:39'
      },
      {
        username: 'csalvo',
        password: 'testing123',
        email: 'csalvo@demo.com',
        createdAt: '2017-12-02 21:48:39',
        updatedAt: '2017-12-02 21:48:39'
      }
      ], {});
  }

};
