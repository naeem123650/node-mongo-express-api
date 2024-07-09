const express = require("express");
require("dotenv").config();
const app = express();
require("./config/db");
const ApiError = require("./utils/ApiError");
const globalErrorHandler = require("./controllers/errorHandler");
const tourRouter = require("./routes/tourRoutes");

const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tours", tourRouter);

app.all("*", (req, res, next) => {
  const err = new ApiError("Route not defined.", 404);
  next(err);
});

app.use(globalErrorHandler);

app.listen(2000, () => {
  console.log(`app started on port 2000`);
});
