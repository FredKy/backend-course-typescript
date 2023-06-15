import dotenv from "dotenv";
import path from "path";

const dirname = path.resolve();

dotenv.config();

if (!process.env.NODE_ENV) {
  throw "No valid environment set!";
}

const NODE_ENV = process.env.NODE_ENV;

const envPath = path.resolve(dirname, `.env.${NODE_ENV}`);

dotenv.config({ path: envPath });

const environment = {
  NODE_ENV,
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: String(process.env.DB_URL),
};

export default environment;
