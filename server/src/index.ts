import { PORT } from "./config/index.config.js";
import { startExpressApp } from "./express-app.js";

const app = startExpressApp();

app.listen(Number(PORT), () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
