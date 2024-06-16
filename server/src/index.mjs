import express from "express";
import inventoryRouter from "./routes/inventory.mjs";
const app = express();

app.use(inventoryRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Express Server Started..");
  console.log(`Listening at ${PORT}`);
  console.log("http://localhost:3000/");
});
