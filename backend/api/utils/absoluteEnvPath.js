import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We go up twice: utils -> api -> root
const envPath = path.resolve(__dirname, "../../.env");
// Load it
dotenv.config({ path: envPath });

export default process.env;
