import express from "express";
import cors from "cors";
import { JSON_LIMIT, publicPath } from "./constants.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));

app.use(express.json({
    limit: JSON_LIMIT
}));
app.use(express.urlencoded({
    extended: true,
    limit: JSON_LIMIT
}));
app.use(express.static(publicPath));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";


// Routes Declaration
app.use("/api/v1/users", userRouter);












export default app;