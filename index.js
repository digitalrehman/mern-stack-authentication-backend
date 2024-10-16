import express from "express";
import "dotenv/config"
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./utils/dbconnection.js";
import routes from "./router/routes.js";
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const port = process.env.PORT || 5000;
app.use("/api", routes);
app.listen(port, () => {
    dbConnection()
    console.log(`Server is running on port ${port}`);
})