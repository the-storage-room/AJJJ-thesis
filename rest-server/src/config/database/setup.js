import db from './index';

const dropStageTwoTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS StageTwo`);
  } catch (err) {
    console.log('error dropping StageTwo Table ');
  }
};

const dropCommentsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Comments`);
  } catch (err) {
    console.log('error dropping Comments Table ');
  }
};

const dropUsersTagsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Users_Tags`);
  } catch (err) {
    console.log('error dropping Users_Tags Table ');
  }
};

const dropMatchTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Rating`);
  } catch (err) {
    console.log('error dropping Match Table ');
  }
};

const dropOutcomesTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Outcomes`);
  } catch (err) {
    console.log('error dropping Outcomes Table');
  }
};

const dropRaterRateeTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Rating`);
  } catch (err) {
    console.log('error dropping RaterRatee Table ');
  }
};

const dropPhotoTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Photo`);
  } catch (err) {
    console.log('error dropping Photo Table ');
  }
};

const dropTagsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Tags`);
  } catch (err) {
    console.log('error dropping Tags Table ');
  }
};

const dropUsersTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS Users`);
  } catch (err) {
    console.log('error dropping Users Table ');
  }
};

const createDatabase = async () => {
  try {
    await db.query(`CREATE DATABASE MatchMe`);
  } catch (err) {
    console.log('Error creating database');
  }
};

const dropDatabase = async () => {
  try {
    await db.query(`DROP DATABASE IF EXISTS MatchMe`);
  } catch (err) {
    console.log('error dropping database ');
  }
};

const createTagsTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS Tags
      (
        id  SERIAL ,
        tag VARCHAR(50) NOT NULL ,
        CONSTRAINT PK_Tags PRIMARY KEY (id)
      )
      `
    );
  } catch (err) {
    console.log('Error creating Tags Table', err);
  }
};

const createUsersTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS Users
      (
        id           SERIAL ,
        username     VARCHAR(50) ,
        password     VARCHAR(255) ,
        email        VARCHAR(50) ,
        lastname     VARCHAR(50) ,
        firstname    VARCHAR(50) ,
        age          INT ,
        location     INT ,
        gender       INT ,
        preference   INT ,
        bio          VARCHAR(255) ,
        powerranking INT DEFAULT 0,
        totalAttractiveness INT DEFAULT 0,
        totalNumOfRatings INT DEFAULT 0, 
        averageAttractiveness INT DEFAULT 5 ,
        signupComplete BOOLEAN ,
        CONSTRAINT PK_Users PRIMARY KEY (id) ,
        CONSTRAINT Unique_Username UNIQUE (username)
      )
      `
    );
  } catch (err) {
    console.log('Error creating Users Table', err);
  }
};

const createUsersTagsTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS Users_Tags
      (
        id     SERIAL ,
        tagId  INT NOT NULL ,
        userId INT NOT NULL ,
        type   INT NOT NULL ,
        CONSTRAINT PK_Users_Tags PRIMARY KEY (id),
        CONSTRAINT FK_UsersTags_Tag FOREIGN KEY (tagId)
        REFERENCES Tags(id),
        CONSTRAINT FK_UsersTags_Users FOREIGN KEY (userId)
        REFERENCES Users(id)
      )
      `
    );
  } catch (err) {
    console.log('Error creating Users_Tags Table', err);
  }
};

const createMatchTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS Match
      (
        id            SERIAL ,
        user1_id      INT NOT NULL ,
        user2_id      INT NOT NULL ,
        approvedCount REAL DEFAULT 0 ,
        rejectedCount REAL DEFAULT 0 ,
        activeVoting  SMALLINT DEFAULT 1 ,
        CONSTRAINT PK_Match PRIMARY KEY (id),
        CONSTRAINT FK_User2_Match FOREIGN KEY (user1_id)
          REFERENCES Users(id),
        CONSTRAINT FK_User1_Match FOREIGN KEY (user2_id)
          REFERENCES Users(id)
      )
      `
    );
  } catch (err) {
    console.log('Error creating Match Table', err);
  }
};

const createOutcomesTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS Outcomes
      (
      id                SERIAL,
      userId            INT NOT null,
      matchId           INT NOT null,
      starred           SMALLINT NOT NULL DEFAULT 0,
      decision          VARCHAR(25) NOT NULL, 
      CONSTRAINT PK_Outcomes PRIMARY KEY (id),
      CONSTRAINT FK_Outcomes_Users FOREIGN KEY (userId)
        REFERENCES Users(id),
      CONSTRAINT FK_Outcomes_Match FOREIGN KEY (matchId)
        REFERENCES Match(id)
      )
      `
    );
  } catch (err) {
    console.log('Error creating Outcomes Table', err);
  }
};

const createRaterRateeTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS RaterRatee
      (
        id           SERIAL ,
        rater        INT NOT NULL ,
        ratee        INT NOT NULL ,
        CONSTRAINT PK_Rating PRIMARY KEY (id),
        CONSTRAINT FK_Users_Rater FOREIGN KEY (rater)
          REFERENCES Users(id),
        CONSTRAINT FK_Users_Ratee FOREIGN KEY (ratee)
          REFERENCES Users(id)
      )
      `
    );
  } catch (err) {
    console.log('Error creating RaterRatee Table', err);
  }
};

const createPhotoTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS Photo
      (
        id     SERIAL ,
        url    VARCHAR(400) NOT NULL ,
        userId INT NOT NULL ,
        primaryPhoto SMALLINT NOT NULL DEFAULT 0 ,
        CONSTRAINT PK_Photo PRIMARY KEY (id),
        CONSTRAINT FK_Users_Photo FOREIGN KEY (userId)
          REFERENCES Users(id)
      )
      `
    );
  } catch (err) {
    console.log('Error creating Photo Table', err);
  }
};

const createStageTwoTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS StageTwo
      (
        id           SERIAL ,
        matchId      INT NOT NULL ,
        isSuccessful SMALLINT NOT NULL DEFAULT 0 ,
        active       SMALLINT NOT NULL DEFAULT 1 ,
        firstAccept INT DEFAULT NULL,
        secondAccept INT DEFAULT NULL,
        firstrejection INT DEFAULT NULL,
        CONSTRAINT PK_StageTwo PRIMARY KEY (id),
        CONSTRAINT FK_Match_StageTwo FOREIGN KEY (matchId)
          REFERENCES Match(id),
        CONSTRAINT Unique_matchId UNIQUE (matchId)
      )
      `
    );
  } catch (err) {
    console.log('Error creating StageTwo Table', err);
  }
};

const createCommentTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS Comments
      (
        id      SERIAL ,
        userId  INT NOT NULL ,
        matchId INT NOT NULL ,
        votes   INT NOT NULL DEFAULT 0 ,
        type    INT NOT NULL ,
        comment VARCHAR(255) NOT NULL ,
        CONSTRAINT PK_comments PRIMARY KEY (id),
        CONSTRAINT FK_User_Comments FOREIGN KEY (userId)
          REFERENCES Users(id),
        CONSTRAINT FK_Match_Comments FOREIGN KEY (matchId)
          REFERENCES Match(id)
      )
      `
    );
  } catch (err) {
    console.log('Error creating Comment Table', err);
  }
};

const setup = async () => {
  await dropDatabase();
  await dropTagsTable();
  await dropUsersTable();
  await dropPhotoTable();
  await dropStageTwoTable();
  await dropRaterRateeTable();
  await dropMatchTable();
  await dropOutcomesTable();
  await dropUsersTagsTable();
  await dropCommentsTable();

  await createDatabase();
  await createTagsTable();
  await createUsersTable();
  await createUsersTagsTable();
  await createMatchTable();
  await createOutcomesTable();
  await createRaterRateeTable();
  await createPhotoTable();
  await createStageTwoTable();
  await createCommentTable();

  process.exit();
};

setup();
