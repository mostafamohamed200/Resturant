import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});