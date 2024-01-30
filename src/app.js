import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

// route imports
import products from "./routes/productRoute.js";
import user from "./routes/userRoute.js";

// middlewares Imports
import errorHandler from "./middlewares/Error.js";

const app = express();
app.use(
  cors({
    origin: `https://discountshippingcanada.com`,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// add routes
app.use("/api/v1/user", user);
app.use("/api/v1", products);

// middleware for error
app.use(errorHandler);

export default app;
