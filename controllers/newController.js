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
  console.log(req.body)
  await addItem({
    name: name,
    buyprice: Number(buyprice) || null,
    sellprice: Number(sellprice) || null,
    themeid1: Number(themeid1) || null,
    themeid2: Number(themeid2) || null,
    sourceid1: Number(sourceid1) || null,
    sourceid2: Number(sourceid2) || null,
  });
  
  res.redirect("/")
}
