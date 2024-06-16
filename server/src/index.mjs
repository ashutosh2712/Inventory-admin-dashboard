import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Express Server Started..");
  console.log(`Listening at ${PORT}`);
  console.log("http://localhost:3000/");
});
