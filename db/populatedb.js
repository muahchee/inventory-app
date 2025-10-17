#! /usr/bin/env node
import { Client } from "pg";
import dotenv from "dotenv";
import { argv } from "node:process";
import { getEnv } from "../helpers/getEnv.js";

dotenv.config();

const { connectionString } = getEnv(argv);

const SQL = `
CREATE TABLE IF NOT EXISTS hhatheme (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  themename TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS source (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sourcename TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  buyprice INTEGER,
  sellprice INTEGER,
  themeid1 INTEGER REFERENCES hhatheme,
  themeid2 INTEGER REFERENCES hhatheme,
  sourceid1 INTEGER REFERENCES source,
  sourceid2 INTEGER REFERENCES source
);

INSERT INTO hhatheme
(themename)
VALUES ('Amusement park'), ('Ancient'), ('Apparel shop'), ('Arcade'), ('Bathroom'), ('Cafe'), ('Childs room'), ('City life'), ('Concert'), ('Construction site'), ('Den'), ('European'), ('Expensive'), ('Facility'), ('Fantasy'), ('Fancy'), ('Fitness'), ('Freezing cold'), ('Garden'), ('Harmonious'), ('Heritage'), ('Horror'), ('Hospital'), ('Kitchen'), ('Lab'), ('Living room'), ('Local'), ('Music'), ('Nature'), ('Ocean'), ('Office'), ('Outdoors'), ('Park'), ('Party'), ('Public bath'), ('Resort'), ('Restaurant'), ('Retro'), ('Space'), ('School'), ('Sci-fi'), ('Shop'), ('Sport'), ('Stylish'), ('Supermarket'), ('Workshop');

INSERT INTO source
(sourcename)
VALUES ('Crafting'), ('Nooks Cranny'), ('Paradise Planning Office'), ('Brewster'), ('C.J'), ('Flick'), ('Nook Shopping'), ('Cooking'), ('Gulliver'), ('Villager'), ('Jolly Redd'), ('Katrina'), ('Sahara');

INSERT INTO item
(name, buyprice, sellprice, themeid1, themeid2, sourceid1, sourceid2)
VALUES
('Fish rug', NULL, 375, 30, 7, 5, NULL),
('Greenhouse box', 17000, 4250, 19, 27, 2, 3),
('Paper tiger', 1500, 375, 20, NULL, 2, NULL)
;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
