import {
  updateItem,
  getItemById,
  getThemeById,
  getSourceById,
  getItemByName,
} from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const priceError = "needs to be a number between 0 and 1,000,000";

const validateItem = [
  body("name")
    .trim()
    .customSanitizer((value) => {
      if (typeof value.charAt(0) === "string") {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
      } else {
        return value;
      }
    }),
  body("buyprice")
    .trim()
    .optional({ values: "falsy" })
    .custom(async (value) => {
      if ((value < 0 || value > 1000000) && value !== null && value !== "") {
        throw new Error("Buy price " + priceError);
      }
    })
    .customSanitizer((value) => {
      if (value === '0') {
        return '';
      } else {
        return value;
      }
    }),
  body("sellprice")
    .trim()
    .optional({ values: "falsy" })
    .custom(async (value) => {
      if ((value < 0 || value > 1000000) && value !== null && value !== "") {
        console.log(typeof value);
        throw new Error("Sell price " + priceError + value);
      }
    })
    .customSanitizer((value) => {
      if (value === '0') {
        return '';
      } else {
        return value;
      }
    }),
  body("url")
    .trim()
    .optional({ values: "falsy" })
    .isURL()
    .custom(async (value) => {
      console.log("url " + value);
      if (
        value.includes("https://nookipedia.com/wiki/Item:") === false &&
        value !== null
      )
        throw new Error(
          `URL should start with "https://nookipedia.com/wiki/Item:". Just copy and paste the whole URL.`
        );
    }),
];

async function getThemes(targetItem) {
  return [
    {
      id: targetItem.themeid1 ? targetItem.themeid1 : null,
      themename: targetItem.themeid1
        ? await getThemeById(targetItem.themeid1)
        : "",
    },
    {
      id: targetItem.themeid2 ? targetItem.themeid2 : null,
      themename: targetItem.themeid2
        ? await getThemeById(targetItem.themeid2)
        : "",
    },
  ];
}

async function getSources(targetItem) {
  return [
    {
      id: targetItem.sourceid1 ? targetItem.sourceid1 : null,
      sourcename: targetItem.sourceid1
        ? await getSourceById(targetItem.sourceid1)
        : "",
    },
    {
      id: targetItem.sourceid2 ? targetItem.sourceid2 : null,
      sourcename: targetItem.sourceid2
        ? await getSourceById(targetItem.sourceid2)
        : "",
    },
  ];
}

export async function updateItemGet(req, res) {
  const targetItem = await getItemById(req.params.id);
  const themes = await getThemes(targetItem);
  const sources = await getSources(targetItem);
  console.log(targetItem.buyprice);
  res.render("update", {
    title: "Update an item",
    targetItem: targetItem,
    themes: themes,
    sources: sources,
  });
}

export const updateItemPost = [
  validateItem,
  async (req, res) => {
    const targetItem = await getItemById(req.params.id);
    const themes = await getThemes(targetItem);
    const sources = await getSources(targetItem);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("update", {
        title: "Update an item",
        targetItem: targetItem,
        themes: themes,
        sources: sources,
        errors: errors.array(),
      });
    }
    const { name, buyprice, sellprice, url } = matchedData(req, {
      includeOptionals: true,
    });
    console.log(matchedData(req, {
      includeOptionals: true,
    }))

    const { themeid1, themeid2, sourceid1, sourceid2 } = req.body;

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
  },
];

// export async function updateItemPost(req, res) {
//   const {
//     name,
//     buyprice,
//     sellprice,
//     themeid1,
//     themeid2,
//     sourceid1,
//     sourceid2,
//     url,
//   } = req.body;
//   await updateItem(
//     {
//       name: name,
//       buyprice: buyprice === "" ? null : Number(buyprice),
//       sellprice: sellprice === "" ? null : Number(sellprice),
//       themeid1: themeid1 === "" ? null : Number(themeid1),
//       themeid2: themeid2 === "" ? null : Number(themeid2),
//       sourceid1: sourceid1 === "" ? null : Number(sourceid1),
//       sourceid2: sourceid2 === "" ? null : Number(sourceid2),
//       url: url,
//     },
//     req.params.id
//   );

//   res.redirect("/");
// }
