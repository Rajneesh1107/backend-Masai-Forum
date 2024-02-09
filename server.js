require("dotenv").config({ silent: true });
const express = require("express");
const connection = require("./lib/db/mongo");
const fs = require("fs");
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
fs.readdirSync(`${__dirname}/routes/api`).map((file) => {
  require(`./routes/api/${file}`)(app);
});
app.listen(PORT, async () => {
  await connection();
  console.log(`server is running port at ${PORT}`);
});
