import { Router } from "express";
import { allItemsGet, deleteItemGet } from "../controllers/indexController.js";
import {
  updateItemGet,
  updateItemPost,
} from "../controllers/updateController.js";
import {
  checkPasswordGet,
  checkPasswordPost,
} from "../controllers/confirmController.js";

export const indexRouter = Router();

indexRouter.get("/", allItemsGet);
indexRouter.get("/:id/delete", deleteItemGet);
indexRouter.get("/:id/update", updateItemGet);
indexRouter.post("/:id/update", updateItemPost);

indexRouter.get("/:id/:action/confirm", checkPasswordGet);
indexRouter.post("/:id/:action/confirm", checkPasswordPost);
