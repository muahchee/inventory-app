import { addItem, getItemByName } from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const priceError = "needs to be a number between 1 and 1,000,000";

const validateItem = [
  body("name")
    .trim()
    .customSanitizer((value) => {
      if (typeof value.charAt(0) === "string") {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
      } else {
        return value;
      }
    })
    .custom(async (value) => {
      const existingItem = await getItemByName(value);
      if (existingItem) throw new Error("Item already exists!");
    }),
  ,
  body("buyprice")
    .trim()
    .optional({ values: "falsy" })
    .custom(async (value) => {
      if ((value < 0 || value > 1000000) && value !== null && value !== "") {
        throw new Error("Buy price " + priceError);
      }
    })
    .customSanitizer((value) => {
      if (value === "0") {
        return "";
      } else {
        return value;
      }
    }),
  body("sellprice")
    .trim()
    .optional({ values: "falsy" })
    .custom(async (value) => {
      if ((value < 0 || value > 1000000) && value !== null && value !== "") {
        throw new Error("Sell price " + priceError + value);
      }
    })
    .customSanitizer((value) => {
      if (value === "0") {
        return "";
      } else {
        return value;
      }
    }),
  body("url")
    .trim()
    .optional({ values: "falsy" })
    .isURL()
    .custom(async (value) => {
      if (
        value.includes("https://nookipedia.com/wiki/Item:") === false &&
        value !== null
      )
        throw new Error(
          `URL should start with "https://nookipedia.com/wiki/Item:". Just copy and paste the whole URL.`
        );
    }),
];

export async function addItemGet(req, res) {
  res.render("new", { title: "Add an item" });
}

export const addItemPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", {
        title: "Add an item",
        errors: errors.array(),
      });
    }
    const { name, buyprice, sellprice, url } = matchedData(req, {
      includeOptionals: true,
    });

    const { themeid1, themeid2, sourceid1, sourceid2 } = req.body;

    await addItem(
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
  },
];
