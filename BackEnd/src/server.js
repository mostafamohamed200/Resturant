import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});