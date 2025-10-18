import { addItem, getItemByName } from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const priceError = "needs to be a number between 1 and 1,000,000";

const validateItem = [
  body("name")
    .trim()
    .customSanitizer((value) => {
      if (typeof text.charAt(0) === "string") {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
      } else {
        return value;
      }
    })
    .custom(async (value) => {
      const existingItem = await getItemByName(value);
      if (existingItem) throw new Error("Item already exists!");
    }),
  body("buyprice")
    .optional({ values: "falsy" })
    .isInt({ min: 1, max: 1000000 })
    .withMessage(priceError),
  body("sellprice")
    .optional({ values: "falsy" })
    .isInt({ min: 1, max: 1000000 })
    .withMessage(priceError),
  body("url")
    .optional({ values: "falsy" })
    .isURL()
    .custom(async (value) => {
      if (value.includes("https://nookipedia.com/wiki/Item:") === false)
        throw new Error(
          `URL should start with "https://nookipedia.com/wiki/Item:". Just copy and paste the whole URL.`
        );
    }),
];

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
    url,
  } = req.body;

  await addItem({
    name: name,
    buyprice: buyprice === "" ? null : Number(buyprice),
    sellprice: sellprice === "" ? null : Number(sellprice),
    themeid1: themeid1 === "" ? null : Number(themeid1),
    themeid2: themeid2 === "" ? null : Number(themeid2),
    sourceid1: sourceid1 === "" ? null : Number(sourceid1),
    sourceid2: sourceid2 === "" ? null : Number(sourceid2),
    url: url,
  });

  res.redirect("/");
}
