import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import connectDB from "./database/db.js";

dotenv.config();

const app = express();
// default middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

// "http://localhost:3000/api/v1/user/register"

app.use('/api/v1/users', userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
