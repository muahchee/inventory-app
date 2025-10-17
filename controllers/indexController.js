import {
  getAllItems,
  deleteItem,
} from "../db/queries.js";

export async function allItemsGet(req, res) {
  const items = await getAllItems();
  res.render("index", { title: "My Favourite Items", items: items });
}

export async function deleteItemPost(req, res) {
  const id = req.params.id;
  await deleteItem(id);
  res.redirect("/")
}
