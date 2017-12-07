'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('savedPodcasts', [{
        imageUrl: 'http://is4.mzstatic.com/image/thumb/Music71/v4/61/59/94/615994ff-21b5-9817-3e89-09b7e012336d/source/100x100bb.jpg',
        podcastName: 'Serial',
        createdAt: '2017-12-05 23:20:49',
        updatedAt: '2017-12-05 23:20:49',
        userId: 1
      },
      {
        imageUrl: 'http://is5.mzstatic.com/image/thumb/Music71/v4/03/3c/f1/033cf19b-a70e-108f-2d77-82c5b8c8cde0/source/100x100bb.jpg',
        podcastName: 'This American Life',
        createdAt: '2017-12-05 23:20:49',
        updatedAt: '2017-12-05 23:20:49',
        userId: 1
      },
      ], {});
  }
};
