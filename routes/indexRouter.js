import { Router } from "express";
import { allItemsGet, deleteItemPost } from "../controllers/indexController.js";

export const indexRouter = Router();

indexRouter.get("/", allItemsGet);
indexRouter.post("/delete", deleteItemPost);