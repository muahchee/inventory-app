import { addItem, getItemByName } from "../db/queries.js";

export async function addItemGet(req, res) {
  res.render("new", { title: "Add an item" });
}

//todo: validation for dupes
export async function addItemPost(req, res) {
  const {
    name,
    buyprice,
    sellprice,
    themeid1,
    themeid2,
    sourceid1,
    sourceid2,
  } = req.body;
  await addItem({
    name: name,
    buyprice: buyprice,
    sellprice: sellprice,
    themeid1: themeid1,
    themeid2: themeid2,
    sourceid1: sourceid1,
    sourceid2: sourceid2,
  });
  
  res.redirect("/")
}
