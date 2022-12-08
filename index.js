import app from "./app.js"
import mongoose from "mongoose";
import { connectDb } from "./configs/mongoDbConfig.js";

try {
  const db = await connectDb();
  if (db) {
    app.listen(process.env.PORT || 5000, console.log("Server started on port 5000"));

  }

} catch (err) {
  console.log(err);
}

