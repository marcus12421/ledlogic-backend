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
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://dev.discountshippingcanada.com",
    "https://discountshippingcanada.com",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  cors({
    origin: [
      `https://dev.discountshippingcanada.com`,
      "http://localhost:3000",
      "https://discountshippingcanada.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// add routes
app.use("/api/v1/user", user);
app.use("/api/v1", products);
app.use("/api/v1/testing", (req, res) => {
  res.json({
    success: true,
    messgae: 'Working'
  })
});

// middleware for error
app.use(errorHandler);

export default app;
