import { getAllItems, deleteItem } from "../db/queries.js";
import dotenv from "dotenv"

dotenv.config()

export async function allItemsGet(req, res) {
  const items = await getAllItems();
  res.render("index", {
    title: "My Favourite Items",
    items: items,
    pw: process.env.PW,
  });
}

export async function deleteItemGet(req, res) {
  const id = req.params.id;
  await deleteItem(id);
  res.redirect("/");
}
