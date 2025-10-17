import { pool } from "./pool.js";
import format from "pg-format";

export async function getAllItems() {
  const sql =
    "SELECT name, buyprice, sellprice, t1.themename AS theme1, t2.themename AS theme2, s1.sourcename AS source1, s2.sourcename AS source2 FROM item LEFT JOIN source s1 ON item.sourceid1 = s1.id LEFT JOIN source s2 ON item.sourceid2 = s2.id LEFT JOIN hhatheme t1 ON item.themeid1 = t1.id LEFT JOIN hhatheme t2 ON item.themeid2 = t2.id;";

  const { rows } = await pool.query(sql);
  return rows;
}

export async function addItem(obj) {
  const sql =
    "INSERT INTO item (name, buyprice, sellprice, themeid1, themeid2, sourceid1, sourceid2) VALUES ($1, $2, $3, $4, $5, $6, $7)";

  await pool.query(sql, [
    obj.name,
    obj.buyprice,
    obj.sellprice,
    obj.themeid1,
    obj.themeid2,
    obj.sourceid1,
    obj.sourceid2,
  ]);
}

