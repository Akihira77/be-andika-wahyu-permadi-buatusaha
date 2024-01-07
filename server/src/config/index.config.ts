import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
	dotenv.config({ path: "./.env" });
} else {
	dotenv.config();
}

export const { PORT, NODE_ENV } = process.env;
