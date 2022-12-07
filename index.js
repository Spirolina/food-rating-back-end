import app from "./app.js"
import mongoose from "mongoose";
import 'dotenv/config';
mongoose.set('strictQuery', true)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, console.log("Server started on port 5000"));
  })
  .catch((err) => {
    console.log(err);
  });
