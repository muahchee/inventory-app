import {
  updateItem,
  getItemById,
  getThemeById,
  getSourceById,
} from "../db/queries.js";

export async function updateItemGet(req, res) {
  const targetItem = await getItemById(req.params.id);
  const themes = [
    {
      id: (targetItem.themeid1) ? targetItem.themeid1 : null,
      themename: (targetItem.themeid1) ? await getThemeById(targetItem.themeid1) : "",
    },
    {
      id: (targetItem.themeid2) ? targetItem.themeid2 : null,
      themename: (targetItem.themeid2) ? await getThemeById(targetItem.themeid2) : "",
    },
  ];
  const sources = [
    {
      id: (targetItem.sourceid1) ? targetItem.sourceid1 : null,
      sourcename: (targetItem.sourceid1) ? await getSourceById(targetItem.sourceid1) : "",
    },
    {
      id: (targetItem.sourceid2) ? targetItem.sourceid2 : null,
      sourcename: (targetItem.sourceid2) ? await getSourceById(targetItem.sourceid2) : "",
    },
  ];
  res.render("update", {
    title: "Update an item",
    targetItem: targetItem,
    themes: themes,
    sources: sources,
  });
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
    url,
  } = req.body;
  await updateItem(
    {
      name: name,
      buyprice: buyprice === "" ? null : Number(buyprice),
      sellprice: sellprice === "" ? null : Number(sellprice),
      themeid1: themeid1 === "" ? null : Number(themeid1),
      themeid2: themeid2 === "" ? null : Number(themeid2),
      sourceid1: sourceid1 === "" ? null : Number(sourceid1),
      sourceid2: sourceid2 === "" ? null : Number(sourceid2),
      url: url,
    },
    req.params.id
  );

  res.redirect("/");
}
