import { Router } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const router = Router();

// const inventories = [
//   {
//     _id: 1,
//     name: "new",
//     date: "12/04/24",
//     price: "$12000",
//   },
// ];

router.get("/api/inventory", (request, response) => {
  const inventories = [];
  const csvFilePath = path.resolve("src/sample-data-v2.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (data) => inventories.push(data))
    .on("end", () => {
      response.json(inventories);
    })
    .on("error", (error) => {
      console.log("Error reading the csv file:", error);
      response.status(500).json({ error: "Failed to read the csv file" });
    });
});

router.get("/api/inventory/chart", (request, response) => {
  const inventoryChartData = [];
  const csvFilePath = path.resolve("src/sample-data-v2.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (data) => {
      inventoryChartData.push({
        inventory_type: data.condition,
        price: parseFloat(data.price.replace("USD", "")),
        date: data.timestamp.split(" ")[0],
      });
    })
    .on("end", () => {
      const groupedData = inventoryChartData.reduce((acc, curr) => {
        const { date, inventory_type } = curr;

        if (!acc[date]) {
          acc[date] = { date: date, inventory: {} };
        }

        if (!acc[date].inventory[inventory_type]) {
          acc[date].inventory[inventory_type] = 0;
        }

        acc[date].inventory[inventory_type] += 1;

        return acc;
      }, {});

      const formattedData = Object.values(groupedData);

      response.json(formattedData);
    })
    .on("error", (error) => {
      console.log("Error reading the csv file:", error);
      response.status(500).json({ error: "Failed to read the CSV file" });
    });
});

router.get("/api/inventory/table", (request, response) => {
  const inventoryTableData = [];
  const csvFilePath = path.resolve("src/sample-data-v2.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (data) => {
      inventoryTableData.push({
        inventory_type: data.condition,
        date: data.timestamp.split(" ")[0],
        price: parseFloat(data.price.replace("USD", "")),
      });
    })
    .on("end", () => {
      const groupedData = inventoryTableData.reduce((acc, curr) => {
        const { inventory_type, date, price } = curr;

        if (!acc[date]) {
          acc[date] = {
            date,
            new: { count: 0, totalPrice: 0 },
            used: { count: 0, totalPrice: 0 },
            cpo: { count: 0, totalPrice: 0 },
          };
        }
        if (!acc[date][inventory_type]) {
          acc[date][inventory_type] = { count: 0, totalPrice: 0 };
        }

        acc[date][inventory_type].count += 1;
        acc[date][inventory_type].totalPrice += price;

        return acc;
      }, {});

      let idCounter = 1;
      const formattedData = Object.values(groupedData).map((item) => {
        const newPrice = item.new.totalPrice;
        const newCount = item.new.count;
        const newAvgPrice =
          newCount > 0 ? (newPrice / newCount).toFixed(2) : "0.00";

        const usedPrice = item.used.totalPrice;
        const usedCount = item.used.count;
        const usedAvgPrice =
          usedCount > 0 ? (usedPrice / usedCount).toFixed(2) : "0.00";

        const cpoPrice = item.cpo.totalPrice;
        const cpoCount = item.cpo.count;
        const cpoAvgPrice =
          cpoCount > 0 ? (cpoPrice / cpoCount).toFixed(2) : "0.00";

        return {
          id: idCounter++,
          date: item.date,
          newCount,
          newPrice: `$${newPrice.toFixed(2)}`,
          newAvgPrice: `$${newAvgPrice}`,
          usedCount,
          usedPrice: `$${usedPrice.toFixed(2)}`,
          usedAvgPrice: `$${usedAvgPrice}`,
          cpoCount,
          cpoPrice: `$${cpoPrice.toFixed(2)}`,
          cpoAvgPrice: `$${cpoAvgPrice}`,
        };
      });
      response.json(formattedData);
    })
    .on("error", (error) => {
      console.log("Error reading the csv file:", error);
      response.status(500).json({ error: "Failed to read the CSV file" });
    });
});
export default router;
