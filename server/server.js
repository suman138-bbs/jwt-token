import express from "express";
import cors from "cors";
import morgon from "morgan";
import dotenv from "dotenv";

import connect from "./config/dbConnection.js";
import router from "./router/route.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgon("tiny"));
app.disable("x-powered-by");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(201).json({ HomePage: "HomePage" });
});

app.use("/api", router);

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server running at port ${PORT} `);
      });
    } catch (error) {
      console.log("Can't connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database connection");
  });
