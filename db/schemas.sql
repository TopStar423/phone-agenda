DROP database podtalk_db;

CREATE database podtalk_db;

use podtalk_db;

CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	PRIMARY KEY(id),
	createdAt CURRENT_TIMESTAMP,
	updatedAt CURRENT_TIMESTAMP
);

CREATE TABLE comments (
	id INT AUTO_INCREMENT NOT NULL,
  userID INT NOT NULL,
	comment TEXT NOT NULL,
	podcastInfo VARCHAR(255) NOT NULL,
	PRIMARY KEY(id),
		FOREIGN KEY (userID)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE saved_podcast (
	id INT AUTO_INCREMENT NOT NULL,
	userID INT NOT NULL,
	podcastFeedURL VARCHAR(255) NOT NULL,
	PRIMARY KEY(id),
			FOREIGN KEY (userID)
        REFERENCES users(id)
        ON DELETE CASCADE

);

