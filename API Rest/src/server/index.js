import "dotenv/config";
import express from "express";
import routes from "./routes/routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000, () => console.log("http://localhost:3000"));
