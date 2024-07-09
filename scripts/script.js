const fs = require("fs");
const Tour = require("../models/tourModel");
const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/../.env` });

connectDB().catch((error) => {
  console.log(error);
});

async function connectDB() {
  const conn = await mongoose.connect(process.env.DB_CONNECTION);
  console.log("connection established..");
}

const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/sample-tour.json`, "utf-8")
);

const importData = async () => {
  try {
    console.log(`Importing in progress..`);
    await Tour.create(tourData);
    console.log(`file imported successfully`);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    console.log(`Deletion in progress..`);
    await Tour.deleteMany();
    console.log(`Data deleted successfully`);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
} else {
  setTimeout(() => {
    console.log("wrong choice..");
  }, 2000);
  process.exit(1);
}
