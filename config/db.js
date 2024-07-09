const mongoose = require("mongoose");

connectDB().catch((err) => {
  console.log(err);
});

async function connectDB() {
  const conn = await mongoose.connect(process.env.DB_CONNECTION);
  console.log(conn.connection.host);
}

module.exports = connectDB;
