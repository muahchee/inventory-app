import { Router } from "express";
import { updateItemGet, updateItemPost } from "../controllers/updateController.js";

export const updateRouter = Router();

updateRouter.get("/", updateItemGet)
updateRouter.post("/", updateItemPost)