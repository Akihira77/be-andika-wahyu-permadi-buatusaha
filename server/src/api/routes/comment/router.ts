import { Router } from "express";
import * as commentHandler from "./handler.js";

const commentRouter = Router();

commentRouter.post("", commentHandler.create);

commentRouter.get("", commentHandler.getAll);

commentRouter.put("/:id", commentHandler.edit);

commentRouter.get("/:id", commentHandler.getCommentById);

export default commentRouter;
