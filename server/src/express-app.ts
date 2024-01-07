import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./api/middlewares/errorHandler.middleware.js";
import commentRouter from "./api/routes/comment/router.js";

export const startExpressApp = () => {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(
		cors({
			methods: ["PUT", "GET", "POST", "DELETE"],
			origin: ["http://localhost:5173"]
		})
	);
	app.use(morgan("dev"));

	app.use("/api/comments", commentRouter);

	app.use(errorHandler);

	return app;
};
