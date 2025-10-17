import { updateItem, getItemById } from "../db/queries.js";

export async function updateItemGet(req, res) {
  const targetItem = await getItemById(req.params["id"]);
  res.render("update", { title: "Update an item", item: targetItem });
}

export async function updateItemPost(req, res) {
  const {
    name,
    buyprice,
    sellprice,
    themeid1,
    themeid2,
    sourceid1,
    sourceid2,
  } = req.body;
  await updateItem({
    name: name,
    buyprice: buyprice === "" ? null : Number(buyprice),
    sellprice: sellprice === "" ? null : Number(sellprice),
    themeid1: themeid1 === "" ? null : Number(themeid1),
    themeid2: themeid2 === "" ? null : Number(themeid2),
    sourceid1: sourceid1 === "" ? null : Number(sourceid1),
    sourceid2: sourceid2 === "" ? null : Number(sourceid2),
  });

  res.redirect("/");
}
