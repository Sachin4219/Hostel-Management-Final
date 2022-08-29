import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"

import router from "./api/index.js" 

import { runEscalater } from "./scheduler.js";
const app = express();

const PORT = process.env.PORT || 5000

// Config Body Parser
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json())
app.use(cors());

const uri = process.env.MONGODB_URI 


// Database connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
  runEscalater()
}))
.catch((error) => {
  console.log(`${error} did not connect`)
}
);

app.use(router)