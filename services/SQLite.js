import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

const errorCB = err => {
  console.log('SQL Error: ' + err);
};

const successCB = () => {
  console.log('DB opened');
};

export const getConnection = async () => {
  return openDatabase(
    {name: 'user_data.db', location: 'default'},
    successCB,
    errorCB,
  );
};

export const createTables = async db => {
  try {
    const queries = [
      `DROP TABLE IF EXISTS history;`,
      `DROP TABLE IF EXISTS cards`,
      `CREATE TABLE IF NOT EXISTS cards ( 
          uuid TEXT PRIMARY KEY,
          current BOOLEAN NOT NULL,
          code TEXT NOT NULL,
          name TEXT NOT NULL, 
          desc TEXT,
          parameters JSON NOT NULL 
          );`,
      `CREATE TABLE IF NOT EXISTS history ( 
          instanceid INTEGER PRIMARY KEY,
          timestamp INTEGER,
          cardhistoryid INTEGER,
          FOREIGN KEY (cardhistoryid) REFERENCES history(cardid)
           )`,
    ];
    queries.forEach(async query => {
      await db.executeSql(query);
    });
  } catch (err) {
    console.log(err);
  }
};

export const listTables = async db => {
  const query = `SELECT * FROM sqlite_master WHERE type='table'`;
  const results = await db.executeSql(query);
  return results;
};

export const uploadTestCards = async (db, testCards) => {
  testCards.forEach(async (card, index) => {
    try {
      const result = await db.executeSql(
        `INSERT INTO cards VALUES(
          ${card.uuid},
          ${card.current ? 1 : 0},
          "${card.code}",
          "${card.name}", ${
          card.desc ? '"' + card.desc + '"' : null
        }, "${encodeURIComponent(JSON.stringify(card.parameters))}");`,
      );
      console.log(result[0].rows.raw());
    } catch (err) {
      console.log(err);
    }
  });
};

export const listCards = async db => {
  console.log('Listing cards');
  const results = await db.executeSql(`SELECT * FROM cards;`);
  return results;
};

export const addHistoryInstance = async (db, cardIndex) => {
  try {
    await db.executeSql(
      `INSERT INTO history VALUES (NULL,strftime('%s','now'),${cardIndex});`,
    );
  } catch (err) {}
};
