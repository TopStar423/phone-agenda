 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('comments', [{
        comment: "This was a great episode! So many twists and turns, what do you guys think will happen next?",
        username: 'akelley',
        podcastName: "Serial",
        podcastEpisodeName: "S-Town Is Live",
        createdAt: '2017-12-04 14:21:35',
        updatedAt: '2017-12-04 14:21:35',
        userId: 1
      },
      {
        comment: "I totally agree, this was one of my favorites!",
        username: 'cgalya',
        podcastName: "Serial",
        podcastEpisodeName: "S-Town Is Live",
        createdAt: '2017-12-04 22:15:20',
        updatedAt: '2017-12-04 22:15:20',
        userId: 2
      },
      {
        comment: "So spooky!",
        username: 'csalvo',
        podcastName: "Serial",
        podcastEpisodeName: "S-Town Is Live",
        createdAt: '2017-12-05 23:20:49',
        updatedAt: '2017-12-05 23:20:49',
        userId: 3
      }], {});
  }
};
