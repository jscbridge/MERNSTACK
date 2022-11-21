const express = require("express");
require("dotenv").config();  
const router = require("./routes/routes");
require("./dataBases/mongo");
require("./dataBases/mysql");

const app = express();

app.use(express.json());
app.use(express.static("build")); 
 
app.use("/", router);

 
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server ON: ${port}!`));

