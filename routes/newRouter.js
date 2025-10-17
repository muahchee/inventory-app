import { Router } from "express";
import { addItemGet, addItemPost } from "../controllers/newController.js";

export const newRouter = Router();

newRouter.get("/", addItemGet)
newRouter.post("/", addItemPost)